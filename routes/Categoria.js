const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaController');

router.get('/crear', categoriaController.mostrarFormulario);
router.post('/crear', categoriaController.crearCategoria);

module.exports = router;
