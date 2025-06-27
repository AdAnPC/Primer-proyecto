const { Usuario, Venta, Bodega,Compra,MovimientoInventario, Producto, DetalleFactura, Factura, Inventario, Cliente , Gasto,CategoriaGasto,Proveedor } = require('../models');

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




// mostrar gastos

exports.mostrarCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaGasto.findAll();
    res.render('categoriaGasto/mostrar', { categorias });
  } catch (error) {
    console.error('Error al mostrar categorías de gasto:', error);
    res.status(500).send('Error al mostrar categorías');
  }
};