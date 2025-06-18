const Categoria = require('../models/Categoria');

exports.mostrarFormulario = (req, res) => {
  res.render('categoria/crear', {
    title: 'Registrar Categoría'
  });
};

exports.crearCategoria = async (req, res) => {
  const { Nombre, Descripcion } = req.body;

  try {
    await Categoria.create({ Nombre, Descripcion });

    res.render('categoria/crear', {
      title: 'Registrar Categoría',
      success: `Categoría ${Nombre} registrada correctamente`
    });
  } catch (error) {
    console.error('Error al registrar categoría:', error);
    res.render('categoria/crear', {
      title: 'Registrar Categoría',
      error: 'Hubo un problema al registrar la categoría'
    });
  }
};
