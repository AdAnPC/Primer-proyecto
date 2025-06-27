const express = require('express');
const router = express.Router();
const GastoController = require('../controllers/GastoController');

router.get('/crear', GastoController.mostrarFormulario);
router.post('/crear', GastoController.crearGasto);
router.get('/mostrar', GastoController.mostrarGastos);

module.exports = router;
