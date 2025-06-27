
const { Usuario, Venta, Bodega,Compra,MovimientoInventario, Producto, DetalleFactura, Factura, Inventario, Cliente , Gasto,CategoriaGasto,Proveedor } = require('../models');

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





// mostar los gasto 
exports.mostrarGastos = async (req, res) => {
  try {
    const gastos = await Gasto.findAll({
      include: {
        model: CategoriaGasto,
        as: 'categoria' // ← ¡usa el mismo alias definido en el modelo!
      }
    });

    res.render('gasto/mostrar', { gastos });
  } catch (error) {
    console.error('Error al mostrar gastos:', error);
    res.status(500).send('Error al mostrar gastos');
  }
};
