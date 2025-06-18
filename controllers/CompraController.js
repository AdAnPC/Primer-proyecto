const Proveedor = require('../models/Proveedor'); // importa directo el modelo
const Producto = require('../models/Producto');
const Compra = require('../models/Compra');
const Inventario = require('../models/Inventario');


exports.mostrarFormulario = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    const productos = await Producto.findAll();

    res.render('compra/crear', {
      title: 'Registrar Compra',
      proveedores,
      productos
    });
  } catch (error) {
    console.error('Error al cargar formulario de compra:', error);
    res.render('compra/crear', {
      title: 'Registrar Compra',
      error: 'No se pudieron cargar proveedores o productos',
      proveedores: [],
      productos: []
    });
  }
};

exports.crearCompra = async (req, res) => {
  const { FechaCompra, ProveedorID, ProductoID, CantidadComprada, PrecioCompra } = req.body;
  const TotalCompra = CantidadComprada * PrecioCompra;

  try {
    // 1. Registrar la compra
    await Compra.create({
      FechaCompra,
      ProveedorID,
      ProductoID,
      CantidadComprada,
      PrecioCompra,
      TotalCompra
    });

    // 2. Buscar si ya hay inventario del producto
    const inventarioExistente = await Inventario.findOne({
      where: { ProductoID }
    });

    if (inventarioExistente) {
      // 3. Si existe, sumar cantidad
      inventarioExistente.Cantidad += parseInt(CantidadComprada);
      inventarioExistente.FechaIngreso = FechaCompra; // actualiza la fecha si quieres
      await inventarioExistente.save();
    } else {
      // 4. Si no existe, crear nuevo inventario
      await Inventario.create({
        ProductoID,
        Cantidad: CantidadComprada,
        FechaIngreso: FechaCompra,
        FechaSalida: null,
        //BodegaID: 1 // 🔧 O escoge la bodega según lógica propia
      });
    }

    // 5. Renderizar con mensaje de éxito
    const proveedores = await Proveedor.findAll();
    const productos = await Producto.findAll();

    res.render('compra/crear', {
      title: 'Registrar Compra',
      success: 'Compra registrada y el inventario actualizado correctamente.',
      proveedores,
      productos
    });

  } catch (error) {
    console.error('Error al registrar compra o actualizar inventario:', error);

    const proveedores = await Proveedor.findAll();
    const productos = await Producto.findAll();

    res.render('compra/crear', {
      title: 'Registrar Compra',
      error: 'Hubo un problema al registrar la compra o actualizar el inventario.',
      proveedores,
      productos
    });
  }
};
