const Factura = require('../models/Factura');
const DetalleFactura = require('../models/DetalleFactura');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Inventario = require('../models/Inventario');


exports.mostrarFormulario = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    const productos = await Producto.findAll();

    res.render('factura/crear', {
      title: 'Registrar Factura',
      clientes,
      productos
    });
  } catch (error) {
    console.error('Error al cargar formulario de factura:', error);
    res.render('factura/crear', {
      title: 'Registrar Factura',
      clientes: [],
      productos: [],
      error: 'No se pudo cargar el formulario'
    });
  }
};

exports.crearFactura = async (req, res) => {
  const { FechaFactura, ClienteID, TotalFactura, MetodoPago, Estado } = req.body;
  const productos = JSON.parse(req.body.productos || '[]');

  try {
    if (!Array.isArray(productos) || productos.length === 0) {
      throw new Error('Debe agregar al menos un producto a la factura.');
    }

    const factura = await Factura.create({
      FechaFactura,
      ClienteID: parseInt(ClienteID),
      TotalFactura: parseFloat(TotalFactura),
      MetodoPago,
      Estado: Estado ? 1 : 0
    });

    for (const p of productos) {
      const cantidadVendida = parseInt(p.CantidadVendida);
      const precioVenta = parseFloat(p.PrecioVenta);

      const inventario = await Inventario.findOne({
        where: { ProductoID: p.ProductoID }
      });

      if (!inventario) {
        throw new Error(`No hay inventario registrado para el producto ID: ${p.ProductoID}`);
      }

      if (inventario.Cantidad < cantidadVendida) {
        throw new Error(`No hay suficiente inventario para el producto: ${p.Nombre || p.ProductoID}`);
      }

      // Descontar del inventario
      inventario.Cantidad -= cantidadVendida;
      await inventario.save();

      // Registrar el detalle
      await DetalleFactura.create({
        FacturaID: factura.FacturaID,
        ProductoID: p.ProductoID,
        CantidadVendida: cantidadVendida,
        PrecioVenta: precioVenta
      });
    }

    res.redirect('/factura/crear');
  } catch (error) {
    console.error('Error al crear factura:', error.message);

    const clientes = await Cliente.findAll();
    const productos = await Producto.findAll();

    res.render('factura/crear', {
      title: 'Registrar Factura',
      error: `❌ ${error.message}`,
      clientes,
      productos
    });
  }
};