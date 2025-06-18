const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    layout: 'layouts/auth',
    errors: [],
    error: null
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.post('/login', [
  body('email').isEmail().withMessage('Ingresa un correo válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
], async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.render('login', {
      title: 'Login',
      layout: 'layouts/auth',
      errors: errors.array(),
      error: null
    });
  }

  try {
    const usuario = await Usuario.findOne({ where: { Email: email } });

    if (!usuario) {
      return res.render('login', {
        title: 'Login',
        layout: 'layouts/auth',
        errors: [],
        error: 'El correo no está registrado'
      });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.Contraseña);

    if (!passwordMatch) {
      return res.render('login', {
        title: 'Login',
        layout: 'layouts/auth',
        errors: [],
        error: 'Contraseña incorrecta'
      });
    }

    // Autenticación correcta
    req.session.user = {
      email: usuario.Email,
      nombre: usuario.NombreUsuario,
    };

    res.redirect('/panel');

  } catch (err) {
    console.error('Error en login:', err);
    res.render('login', {
      title: 'Login',
      layout: 'layouts/auth',
      errors: [],
      error: 'Ocurrió un error al intentar iniciar sesión'
    });
  }
});

module.exports = router;
