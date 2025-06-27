const { Usuario, Venta, Bodega,Compra,MovimientoInventario, Producto, DetalleFactura, Factura, Inventario, Cliente , CategoriaGasto,Proveedor } = require('../models');

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



exports.mostrarBodegas = async (req, res) => {
  try {
    const bodegas = await Bodega.findAll();
    res.render('bodega/mostrar', { bodegas });
  } catch (error) {
    console.error('Error al mostrar bodegas:', error);
    res.status(500).send('Error al mostrar bodegas');
  }
};