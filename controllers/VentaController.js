
const { Usuario, Venta, Producto, Cliente, Factura , CategoriaGasto } = require('../models');

// Mostrar formulario de venta
exports.mostrarFormulario = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    const productos = await Producto.findAll();
    const usuarios = await Usuario.findAll();

    res.render('venta/crear', {
      title: 'Registrar Venta',
      clientes,
      productos,
      usuarios,
      success: null,
      error: null
    });
  } catch (error) {
    console.error('Error al cargar datos para venta:', error);
    res.render('venta/crear', {
      title: 'Registrar Venta',
      clientes: [],
      productos: [],
      usuarios: [],
      success: null,
      error: '❌ Error al cargar datos'
    });
  }
};

// Crear una venta
exports.crearVenta = async (req, res) => {
  const {
    FechaVenta, ClienteID, ProductoID,
    CantidadVendida, PrecioVenta, UsuarioID
  } = req.body;

  const TotalVenta = CantidadVendida * PrecioVenta;

  try {
    // 1. Buscar inventario del producto
    const inventario = await Inventario.findOne({
      where: { ProductoID }
    });

    if (!inventario) {
      throw new Error('Producto no existe en el inventario');
    }

    // 2. Verificar si hay suficiente stock
    if (inventario.Cantidad < CantidadVendida) {
      throw new Error(`No hay suficiente stock del producto. Disponible: ${inventario.Cantidad}`);
    }

    // 3. Registrar la venta
    await Venta.create({
      FechaVenta,
      ClienteID,
      ProductoID,
      CantidadVendida,
      PrecioVenta,
      TotalVenta,
      UsuarioID
    });

    // 4. Actualizar el inventario
    inventario.Cantidad -= parseInt(CantidadVendida);
    inventario.FechaSalida = FechaVenta;
    await inventario.save();

    // 5. Cargar datos para renderizar el formulario de nuevo
    const clientes = await Cliente.findAll();
    const productos = await Producto.findAll();
    const usuarios = await Usuario.findAll();

    res.render('venta/crear', {
      title: 'Registrar Venta',
      success: `✅ Venta registrada y el inventario actualizado.`,
      error: null,
      clientes,
      productos,
      usuarios
    });

  } catch (error) {
    console.error('Error al registrar venta:', error.message);

    const clientes = await Cliente.findAll();
    const productos = await Producto.findAll();
    const usuarios = await Usuario.findAll();

    res.render('venta/crear', {
      title: 'Registrar Venta',
      success: null,
      error: `❌ ${error.message}`,
      clientes,
      productos,
      usuarios
    });
  }
};





// mostrar las ventas 

exports.mostrarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        { model: Cliente, as: 'cliente' },
        { model: Producto, as: 'producto' },
        { model: Usuario, as: 'usuario' }
      ]
    });

    res.render('venta/mostrar', { ventas });
  } catch (error) {
    console.error('Error al mostrar ventas:', error);
    res.status(500).send('Error al mostrar ventas');
  }
};