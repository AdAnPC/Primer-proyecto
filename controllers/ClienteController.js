const { Usuario, Venta, Bodega,Compra,MovimientoInventario, Producto, DetalleFactura, Factura, Inventario, Cliente , Gasto,CategoriaGasto,Proveedor } = require('../models');

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




// mostrar los clientes 


exports.mostrarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.render('cliente/mostrar', { clientes });
  } catch (error) {
    console.error('Error al mostrar clientes:', error);
    res.status(500).send('Error al mostrar clientes');
  }
};