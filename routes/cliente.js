const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');

router.get('/crear', clienteController.mostrarFormulario);
router.post('/crear', clienteController.crearCliente);
router.get('/mostrar', clienteController.mostrarClientes);

module.exports = router;
