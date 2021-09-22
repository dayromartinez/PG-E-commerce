const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const bcrypt = require ("bcryptjs")
const {check}  = require ('express-validator')
const {createUser, loginUser, revalidarToken} = require ('../controllers/auth')
const {validarUser} = require ('../middleware/validarUser')
const {validarJWTUser, validarJWTAdmin} = require ("../middleware/validarJWT")
const Usuario = require("../models/Usuario")
const {EMAIL, EMAILCLAVE} = process.env
const nodemailer = require('nodemailer')
const Orden = require("../models/Orden")
const Producto = require ("../models/Orden")



//----crea un nuevo usuario,los check son los campos oblogatorios, genera un token
//----si es con google enviar como clave el googleid
router.post(
    '/',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('apellido','el nombre es requerido').not().isEmpty(),
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validarUser
    ],
    createUser
);
//----logea al usuario, recibe email y paswors, si es google envia googleid como clave,genera token
router.post(
    '/login',
    [
        check('email','el email es obligtorio').isEmail().not().isEmpty(), 
        check('password','la contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validarUser
    ],
    loginUser
);



//-----------Envia email para recuperacion de contraseña 
router.post( '/sendemail', async (req , res) => {
    const {email} = req.body
    try{
        let user = await Usuario.findOne({email})
        if(!user) return res.status(400).send({msg: 'El correo no esta registrado'})
        let randomCode = Math.round(Math.random()*10000000) 
        await Usuario.updateOne({email},{ "passRetriever": randomCode })
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: EMAIL,
                pass: EMAILCLAVE
            }
        })
        
        await transporter.sendMail({
            from: '"Mario Emporio Henry" <marioemporiohenry@gmail.com>',
            to: user.email,
            text: `Ingrese el siguiente código para recuperar su contraseña: ${randomCode}`
        })
        return res.status(200).send({msg: 'Código de recuperación enviado con exito'})
    } catch {
        res.status(400).send({msg: 'Ocurrio un error intentelo mas tarde'})
    }
    }   
)

//-----------Recibo de cogido 
router.post( '/recoverpass', async (req , res) => {
    let {code, email} = req.body
    try{
        const user = await Usuario.findOne({email})
        if(code === user.passRetriever){
            return res.status(200).send({msg: 'Codigo enviado'})
        }else{
            return res.status(400).send({msg: 'El código ingresado no es correcto'})
        }
    }catch{
        res.status(400).send({msg: 'Ocurrio un error intentelo mas tarde'})
    }
    }   
)

//------------------- actualizacion de contraseña
router.post( '/changepass', async (req , res) => {
    
    let {newPass, code, email} = req.body
    try{

        let user = await Usuario.findOne({email})

        if(code === user.passRetriever){
            
            const salt = bcrypt.genSaltSync();
            newPass = bcrypt.hashSync (newPass, salt);
            await Usuario.findOneAndUpdate({email} ,{ "password": newPass }, {new: true})

            return res.status(200).send({msg: 'Contraseña actualizada con exito'})
        }else{
            return res.status(400).send({msg: 'La clave no pudo ser cambiada'})
        }
    }catch{
        res.status(400).send({msg: 'Ocurrio un error intentelo mas tarde'})
    }
    }   
)



//----elimina un usuario para que no se pueda logear
router.delete('/delete/:id',validarJWTAdmin, async (req,res)=>{
    const {id}=req.params

   await Usuario.findByIdAndRemove(id)
    res.send({ok:true})
})

//---esta en ver, es para regenerar el token
router.get('/renew',validarJWTUser, revalidarToken)

//----trae todo el historial de compras de un usuario en especifico
//----deben enviar token desde el front
router.get('/historyShopping',validarJWTUser, async(req,res)=>{
    const id=req.uid
    var {historialDeCompras}= await Usuario.findById(id)
    historialDeCompras = historialDeCompras.map(async e=> await Orden.findById(e._id).populate('productos.producto',['titulo','precio']))
    historialDeCompras= await Promise.all(historialDeCompras)
    res.send(historialDeCompras)

});

//-----trae los detalles de una orden en especifico
//-----info de producto, cantidas,direccion de entrga y info de usuario de compa
//-----recibe id de orden por params,para user
router.get('/see/:id', async (req,res)=>{
    const {id}=req.params
    const history= await Orden.findById(id)
                            .populate('productos.producto',['titulo','precio'])
    res.send(history)
});

router.get('/profile/:id',async (req,res)=>{
    const {id}= req.params
    const user= await Usuario.findById(id,{"password":0, "historialDeCompras":0})
    res.send(user)
});
router.post('/profile/edit/:id',async (req,res)=>{
    const {id}= req.params
    let userUpdate;
    req.body.foto? userUpdate= await Usuario.findByIdAndUpdate(id,{"foto":req.body.foto},{new:true}): userUpdate= await Usuario.findByIdAndUpdate(id,{"admin":req.body.admin},{new:true})

    res.send(userUpdate)
});

router.post('/whishlist/:producto',validarJWTUser,async(req,res)=>{
    const id=req.uid
    const {producto}=req.params
    let search = await Usuario.findById(id,{whishlist:{$elemMatch:{producto}}})
    if(search.whishlist.length>0){
        return res.send({msj:'ya existe este item'})
    }
    let {whishlist}= await Usuario.findByIdAndUpdate(id,{ $push:{ whishlist:{producto}}}, {new:true})
    res.send(whishlist)
});

router.get('/whishlist',validarJWTUser, async (req,res)=>{
    const id= req.uid
    let {whishlist} = await Usuario.findById(id,{"whishlist.producto":1})
                                    .populate("whishlist.producto",["titulo", "_id", "precio", "autor", "img"])
    res.send(whishlist)
})

router.delete('/whishlist/:producto',validarJWTUser,async(req,res)=>{
    const id= req.uid
    const {producto}=req.params
    let {whishlist}=await Usuario.findByIdAndUpdate(id,{$pull:{whishlist: {producto}}},{new:true})
    res.send(whishlist)
})

router.get('/profiles',async(req,res)=>{
    const users= await Usuario.find({},{"password":0, "historialDeCompras":0,"tarjetas":0,"direcciones":0})
    res.send(users)
})

module.exports = router;