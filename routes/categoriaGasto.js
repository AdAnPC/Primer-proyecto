const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaGastoController');

router.get('/crear', categoriaController.mostrarFormulario);
router.post('/crear', categoriaController.crearCategoriaGasto);
router.get('/mostrar', categoriaController.mostrarCategorias);

module.exports = router;
