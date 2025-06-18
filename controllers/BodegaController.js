const Bodega = require('../models/Bodeja');

exports.mostrarFormulario = (req, res) => {
  res.render('bodega/crear', {
    title: 'Registrar Bodega'
  });
};

exports.crearBodega = async (req, res) => {
  const { Nombre, Direccion, Cantidad } = req.body;

  try {
    await Bodega.create({
      Nombre,
      Direccion,
      Cantidad
    });

    res.render('bodega/crear', {
      title: 'Registrar Bodega',
      success: `Bodega "${Nombre}" registrada correctamente`
    });
  } catch (error) {
    console.error('Error al registrar bodega:', error);
    res.render('bodega/crear', {
      title: 'Registrar Bodega',
      error: 'Hubo un problema al registrar la bodega'
    });
  }
};
