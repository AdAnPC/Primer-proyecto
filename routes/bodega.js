const express = require('express');
const router = express.Router();
const BodegaController = require('../controllers/BodegaController');

router.get('/crear', BodegaController.mostrarFormulario);
router.post('/crear', BodegaController.crearBodega);
router.get('/mostrar', BodegaController.mostrarBodegas);

module.exports = router;
