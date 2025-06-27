const { Usuario, Venta, Bodega,Compra,MovimientoInventario, Producto, DetalleFactura, Factura, Inventario, Cliente , Gasto,CategoriaGasto,Proveedor } = require('../models');

exports.mostrarFormulario = (req, res) => {
  res.render('proveedor/crear', {
    title: 'Registrar Proveedor'
  });
};

exports.crearProveedor = async (req, res) => {
  const { Nombre, Direccion, Telefono, Email } = req.body;

  try {
    await Proveedor.create({
      Nombre,
      Direccion,
      Telefono,
      Email
    });

    res.render('proveedor/crear', {
      title: 'Registrar Proveedor',
      success: `Proveedor ${Nombre} registrado correctamente`
    });
  } catch (error) {
  console.error('Error al registrar proveedor:', error.message);
  console.error(error); // para ver más detalles
  res.render('proveedor/crear', {
    title: 'Registrar Proveedor',
    error: 'Hubo un problema al registrar el proveedor'
  });
}

};







exports.mostrarProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.render('proveedor/mostrar', { proveedores });
  } catch (error) {
    console.error('Error al mostrar proveedores:', error);
    res.status(500).send('Error al mostrar proveedores');
  }
};