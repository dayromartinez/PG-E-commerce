const { Router } = require("express");
const router = Router();
const Usuario = require ("../models/Usuario")
const Producto= require("../models/Producto");
const Orden = require("../models/Orden");
const {validarJWTUser} = require ('../middleware/validarJWT');
const Stripe = require("stripe")
const {EMAIL, EMAILCLAVE} = process.env
const nodemailer = require('nodemailer')


const stripe = new Stripe("sk_test_51JQAouFWmGEeX4od3qJjkwW2cdTVunEMWXE9PgKcNaz0sU2DvmGqLMHAIhuix7usRB1f6oSbE9ZfkD92GKRTmVdv001bFGHwHL")

//-----guarda la compra ya hecha en el usuario y en la base de datos general que seria para el adm
//-----ruta para user y admin
router.post('/',validarJWTUser, async (req,res)=>{
    const {pago, valorTotal, direccion, productos} = req.body;
    const id=req.uid
    try {

        await stripe.paymentIntents.create({

            amount: valorTotal, 
            currency: "USD",
            payment_method: pago,
            confirm: true
        })
        var compra= {...req.body,estado:'creada'}      
        var resCompra= true  
        
        productos.map(async p=> {
            var book = await Producto.findById(p.producto)
            
            book = await Producto.findByIdAndUpdate({"_id":p.producto},{"stock":book.stock-Number(p.cantidad)},{new:true})
            await Usuario.findByIdAndUpdate(id,{$pull:{whishlist:{producto:p.producto}}})
            await Usuario.findByIdAndUpdate(id,{direccion})
        })
        
    
    
    }
    catch (error){
        
        var compra= {...req.body,estado:'cancelada'}
        var resCompra=false
    }
    finally{
        const orden= new Orden(compra);
        orden.user=id
        await orden.save();
        const user= await Usuario.findByIdAndUpdate(id, {$push:{"historialDeCompras": orden}})
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: EMAIL,
                pass: EMAILCLAVE
            }
        })
        var mailOptions={
            from:"Remitente",
            to: user.email,
            subject:"Informe de Compra",
            text: resCompra ? `¡Hola ${user.nombre} ${user.apellido} su compra N° ${orden._id} realizada el dia ${orden.fecha.toDateString()} se completo con exito;puede ver el resumen de su compra en nuestra web.
            Pronto estaremos enviando el producto, que tenga buen dia ` : `¡Hola ${user.nombre} ${user.apellido} le informamos que su compra N° ${orden._id} realizada el dia ${orden.fecha.toDateString()} se encuentra cancelada por problemas al realizar el cobro de la tarjeta, le invitamos a realizar nuevamente la compra. que tenga buen dia`
        }

        transporter.sendMail(mailOptions,(err,info)=>{
           if(err) return res.status(500).send('error en email')
        })

        res.send({ok:resCompra})
    
    }
});
//------busca el libro, cambia el stock y lo envia al front para el carrito

// router.get('/removeOne/:idRemoveOne',async (req,res)=>{
//     const {idRemoveOne}= req.params

//     var book = await Producto.findById(idRemoveOne)
//     book = await Producto.findByIdAndUpdate({"_id":idRemoveOne},{"stock":book.stock+1},{new:true})
//     res.send(book)
// });

// router.get('/removeAll/:idProducto/:count',async (req,res)=>{
    
// });

router.get('/:idProducto',async (req,res)=>{
    const {idProducto}= req.params

    var book = await Producto.findById(idProducto)
    // book = await Producto.findByIdAndUpdate({"_id":idProducto},{"stock":book.stock-1},{new:true})

    res.send(book)
});

module.exports = router;
