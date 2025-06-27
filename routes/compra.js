const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');

router.get('/crear', CompraController.mostrarFormulario);
router.post('/crear', CompraController.crearCompra);
router.get('/mostrar', CompraController.mostrarCompras);

module.exports = router;
