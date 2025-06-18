const Cliente = require('../models/Cliente');

exports.mostrarFormulario = (req, res) => {
  res.render('cliente/crear', {
    title: 'Registrar Cliente'
  });
};

exports.crearCliente = async (req, res) => {
  const { Nombre, Direccion, Telefono, Email } = req.body;

  try {
    await Cliente.create({ Nombre, Direccion, Telefono, Email });

    res.render('cliente/crear', {
      title: 'Registrar Cliente',
      success: `Cliente ${Nombre} registrado correctamente`
    });
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    res.render('cliente/crear', {
      title: 'Registrar Cliente',
      error: 'Hubo un problema al registrar el cliente'
    });
  }
};
