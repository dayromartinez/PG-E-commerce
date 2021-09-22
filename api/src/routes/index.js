const { Router } = require("express");
const Producto = require("./producto.js");
const Genero = require("./genero");
const CartShopping = require ("./cartShopping")
const Orden = require("./orden")
const Usuario = require ("./usuario")
const Promociones = require ("./promociones")
const router = Router();

router.use("/productos", Producto);
router.use("/generos", Genero);
router.use("/cart", CartShopping)
router.use("/orden", Orden)
router.use("/auth", Usuario)
router.use("/promo", Promociones)

module.exports = router;