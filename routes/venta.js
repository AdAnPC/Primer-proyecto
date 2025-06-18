const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/VentaController');

router.get('/crear', ventaController.mostrarFormulario);
router.post('/crear', ventaController.crearVenta);

module.exports = router;
