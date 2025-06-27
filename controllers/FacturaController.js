
const { Usuario, Venta, Bodega,Compra, Producto, DetalleFactura, Factura, Inventario, Cliente , CategoriaGasto,Proveedor } = require('../models');

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




// mostar las factura de todos los registros
exports.mostrarFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll({
            where: { Activo: true }, // 👈 Solo facturas activas

      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['Nombre']
        }
      ]
    });

    res.render('factura/mostrar', { facturas });
  } catch (error) {
    console.error('Error al mostrar facturas:', error);
    res.status(500).send('Error al mostrar facturas');
  }
};


// funcion para cambiar estado de la factura 

exports.cambiarEstado = async (req, res) => {
  const id = req.params.id;

  try {
    const factura = await Factura.findByPk(id);
    if (!factura) {
      return res.status(404).send('Factura no encontrada');
    }

    // Cambiar estado: si era true (pagada), pasa a false (pendiente), y viceversa
    factura.Estado = !factura.Estado;
    await factura.save();

    res.redirect('/factura/mostrar'); // Ajusta la ruta según tu app
  } catch (error) {
    console.error('Error al cambiar estado de la factura:', error);
    res.status(500).send('Error del servidor');
  }
};



exports.inhabilitarFactura = async (req, res) => {
  const facturaID = req.params.id;

  try {
    // Buscar la factura
    const factura = await Factura.findByPk(facturaID);

    if (!factura) {
      return res.status(404).send('❌ Factura no encontrada.');
    }

    // Inhabilitar (eliminar lógicamente)
    factura.Activo = false;
    await factura.save();

    res.redirect('/factura/mostrar'); // Redirige a la vista donde se listan las facturas
  } catch (error) {
    console.error('❌ Error al inhabilitar la factura:', error);
    res.status(500).send('Error al inhabilitar la factura.');
  }
};
