const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaGastoController');

router.get('/crear', categoriaController.mostrarFormulario);
router.post('/crear', categoriaController.crearCategoriaGasto);

module.exports = router;
