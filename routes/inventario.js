const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/InventarioController');
router.get('/mostrar', inventarioController.mostrarFormulario);

module.exports = router;
