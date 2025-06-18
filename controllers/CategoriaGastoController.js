const CategoriaGasto = require('../models/CategoriaGasto'); // importa directo el modelo

exports.mostrarFormulario = (req, res) => {
  res.render('categoriaGasto/crear', {
    title: 'Registrar Categoría de Gasto'
  });
};
exports.crearCategoriaGasto = async (req, res) => {
  const { Nombre, Descripcion } = req.body;

  try {
    await CategoriaGasto.create({
      Nombre,
      Descripcion
    });

    res.render('categoriaGasto/crear', {
      title: 'Registrar Categoría de Gasto',
      success: `Categoría ${Nombre} registrada correctamente`
    });
  } catch (error) {
    console.error('Error al registrar categoría de gasto:', error);
    res.render('categoriaGasto/crear', {
      title: 'Registrar Categoría de Gasto',
      error: 'Hubo un problema al registrar la categoría'
    });
  }
};
