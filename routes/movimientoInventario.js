const express = require('express');
const router = express.Router();
const MovimientoController = require('../controllers/MovimientoInventarioController');

router.get('/crear', MovimientoController.mostrarFormulario);
router.post('/crear', MovimientoController.crearMovimiento);
router.get('/mostrar', MovimientoController.mostrarMovimientos);

module.exports = router;
