
const { Usuario, Venta, Bodega, Producto, Inventario, Cliente, Factura , CategoriaGasto } = require('../models');

// Mostrar formulario para agregar inventario
// Mostrar solo los datos del inventario
exports.mostrarFormulario = async (req, res) => {
  try {
    const inventario = await Inventario.findAll({
       include: [
    { model: Producto, as: 'producto' },
    { model: Bodega, as: 'bodega' }
  ]
    });

    res.render('inventario/mostrar', {
      title: 'Lista de Inventario',
      inventario,
      error: null,
      success: null
    });
  } catch (error) {
    console.error('Error al cargar inventario:', error);
    res.render('inventario/mostrar', {
      title: 'Lista de Inventario',
      inventario: [],
      error: 'No se pudo cargar el inventario',
      success: null
    });
  }
};



// Crear un nuevo registro de inventario y mostrar la lista
exports.crearInventario = async (req, res) => {
  const { ProductoID, Cantidad, FechaIngreso, FechaSalida, BodegaID } = req.body;

  try {
    await Inventario.create({
      ProductoID,
      Cantidad,
      FechaIngreso: FechaIngreso || null,
      FechaSalida: FechaSalida || null,
      BodegaID
    });

    const inventario = await Inventario.findAll({
      include: [Producto, Bodega]
    });

    res.render('inventario/mostrar', {
      title: 'Lista de Inventario',
      success: `Inventario registrado correctamente para el producto ID ${ProductoID}`,
      error: null,
      inventario
    });
  } catch (error) {
    console.error('Error al registrar inventario:', error);
    res.render('inventario/mostrar', {
      title: 'Lista de Inventario',
      success: null,
      error: 'Hubo un problema al registrar el inventario',
      inventario: []
    });
  }
};

// Mostrar lista del inventario (si la necesitas separada)
exports.mostrarLista = async (req, res) => {
  try {
    const inventario = await Inventario.findAll({
      include: [Producto, Bodega]
    });

    res.render('inventario/mostrar', {
      title: 'Lista de Inventario',
      inventario
    });
  } catch (error) {
    console.error('Error al cargar inventario:', error);
    res.render('inventario/mostrar', {
      title: 'Lista de Inventario',
      error: 'No se pudo cargar el inventario',
      inventario: []
    });
  }
};
