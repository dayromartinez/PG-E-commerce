const Orden = require("../models/Orden");
const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const {validarJWTUser, validarJWTAdmin} = require("../middleware/validarJWT")

//----ruta para el admin, trae todas las compras que acen los usuario
router.get('/', validarJWTAdmin, async (req,res)=>{
    const history= await Orden.find({})
                              .populate('user',['nombre','apellido'])
                              .populate('productos.producto',['titulo'])
    res.send(history)
});
//-----trae los detalles de una orden en especifico
//-----info de producto, cantidas,direccion de entrga y info de usuario de compa
//-----recibe id de orden por params, solo para admin

router.get('/:idOrden', async (req,res)=>{
    const {idOrden}=req.params
    const history= await Orden.findById(idOrden)
                              .populate('user',['nombre','apellido','email'])
                              .populate('productos.producto',['titulo','precio'])
    res.send(history)
});
//---cambia el estado de una orden,recibe id de orden y estado
router.post('/:estado/:idOrden', validarJWTAdmin,async(req,res)=>{
    const {estado,idOrden}=req.params
    const orden= await Orden.findByIdAndUpdate(idOrden,{"estado":estado},{new:true})
                            .populate('user',['nombre','apellido','email'])
                            .populate('productos.producto',['titulo','precio'])
    res.send(orden)
})
module.exports = router;