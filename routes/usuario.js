const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');
const { body } = require('express-validator');

// Mostrar formulario
router.get('/crear', usuarioController.mostrarFormulario);

// Procesar formulario con validación
router.post('/crear', [
  body('NombreUsuario').notEmpty().withMessage('El nombre es obligatorio'),
  body('Contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('Rol').notEmpty().withMessage('El rol es obligatorio'),
  body('Email').isEmail().withMessage('Debe ingresar un correo válido'),
], usuarioController.crearUsuario);

module.exports = router;
