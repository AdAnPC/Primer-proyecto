const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductoController');

router.get('/crear', productoController.mostrarFormulario);
router.post('/crear', productoController.crearProducto);
router.get('/mostrar', productoController.mostrarProductos);

module.exports = router;
