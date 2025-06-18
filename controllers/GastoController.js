const db = require('../models');
const Gasto = require('../models/Gasto');
const CategoriaGasto = require('../models/CategoriaGasto'); // importa directo el modelo


exports.mostrarFormulario = async (req, res) => {
  try {
    const categorias = await CategoriaGasto.findAll();
    res.render('gasto/crear', {
      title: 'Registrar Gasto',
      categorias
    });
  } catch (error) {
    console.error('Error al cargar formulario de gasto:', error);
    res.render('gasto/crear', {
      title: 'Registrar Gasto',
      error: 'No se pudieron cargar las categorías',
      categorias: []
    });
  }
};

exports.crearGasto = async (req, res) => {
  const { FechaGasto, Descripcion, Monto, CategoriaGastoID } = req.body;

  try {
    await Gasto.create({
      FechaGasto,
      Descripcion,
      Monto,
      CategoriaGastoID
    });

    const categorias = await CategoriaGasto.findAll();
    res.render('gasto/crear', {
      title: 'Registrar Gasto',
      success: 'Gasto registrado correctamente',
      categorias
    });
  } catch (error) {
    console.error('Error al registrar gasto:', error);
    const categorias = await CategoriaGasto.findAll();
    res.render('gasto/crear', {
      title: 'Registrar Gasto',
      error: 'Hubo un problema al registrar el gasto',
      categorias
    });
  }
};
