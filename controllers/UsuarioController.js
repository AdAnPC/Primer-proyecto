const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.mostrarFormulario = (req, res) => {
  res.render('usuario/from', {
    title: 'Crear Usuario'
  });
};

exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req);
  const { NombreUsuario, Contraseña, Rol, Email, Telefono } = req.body;

  if (!errores.isEmpty()) {
    return res.render('usuario/from', {
      title: 'Crear Usuario',
      errores: errores.array(),
      NombreUsuario,
      Rol,
      Email,
      Telefono
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(Contraseña, 10);
    await Usuario.create({
      NombreUsuario,
      Contraseña: hashedPassword,
      Rol,
      Email,
      Telefono
    });
    res.redirect('/login'); // o a donde prefieras redirigir
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.render('usuarios/crear', {
      title: 'Crear Usuario',
      error: 'Hubo un problema al guardar el usuario',
      NombreUsuario,
      Rol,
      Email,
      Telefono
    });
  }
};
