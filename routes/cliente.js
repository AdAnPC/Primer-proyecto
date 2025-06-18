const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');

router.get('/crear', clienteController.mostrarFormulario);
router.post('/crear', clienteController.crearCliente);

module.exports = router;
