const express = require('express');
const router = express.Router();
const MovimientoController = require('../controllers/MovimientoInventarioController');

router.get('/crear', MovimientoController.mostrarFormulario);
router.post('/crear', MovimientoController.crearMovimiento);

module.exports = router;
