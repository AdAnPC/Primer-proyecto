const MovimientoInventario = require('../models/MovimientoInventario');

const Bodega = require('../models/Bodeja');
const Producto = require('../models/Producto');
const Inventario = require('../models/Inventario');

exports.mostrarFormulario = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    const bodegas = await Bodega.findAll();

    res.render('movimientoInventario/crear', {
      title: 'Registrar Movimiento de Inventario',
      productos,
      bodegas
    });
  } catch (error) {
    console.error('Error al cargar formulario:', error);
    res.render('movimientoInventario/crear', {
      title: 'Registrar Movimiento de Inventario',
      error: 'No se pudieron cargar productos o bodegas',
      productos: [],
      bodegas: []
    });
  }
};





exports.crearMovimiento = async (req, res) => {
  const { FechaMovimiento, ProductoID, CantidadMovida, TipoMovimiento, BodegaID } = req.body;

  try {
    const cantidad = parseInt(CantidadMovida);

    // ✅ Buscar o crear el inventario
    let inventario = await Inventario.findOne({
      where: { ProductoID, BodegaID }
    });

    // Si no existe, lo creamos con la cantidad dependiendo del tipo de movimiento
    if (!inventario) {
      const cantidadInicial = TipoMovimiento === 'ingreso' ? cantidad : -cantidad;

      if (cantidadInicial < 0) {
        throw new Error('No puedes hacer una salida de un inventario que no existe.');
      }

      inventario = await Inventario.create({
        ProductoID,
        BodegaID,
        Cantidad: cantidadInicial,
        FechaIngreso: TipoMovimiento === 'ingreso' ? FechaMovimiento : null,
        FechaSalida: TipoMovimiento === 'salida' ? FechaMovimiento : null
      });
    } else {
      // ✅ Ya existe, lo actualizamos
      if (TipoMovimiento === 'ingreso') {
        inventario.Cantidad += cantidad;
        inventario.FechaIngreso = FechaMovimiento;
      } else if (TipoMovimiento === 'salida') {
        if (inventario.Cantidad < cantidad) {
          throw new Error('No hay suficiente inventario para esta salida');
        }
        inventario.Cantidad -= cantidad;
        inventario.FechaSalida = FechaMovimiento;
      }

      await inventario.save();
    }

    // ✅ Crear el movimiento
    await MovimientoInventario.create({
      FechaMovimiento,
      ProductoID,
      CantidadMovida: cantidad,
      TipoMovimiento,
      BodegaID
    });

    const productos = await Producto.findAll();
    const bodegas = await Bodega.findAll();

    res.render('movimientoInventario/crear', {
      title: 'Registrar Movimiento de Inventario',
      success: '✅ Movimiento registrado y inventario actualizado',
      productos,
      bodegas
    });

  } catch (error) {
    console.error('❌ Error al registrar movimiento:', error);
    const productos = await Producto.findAll();
    const bodegas = await Bodega.findAll();

    res.render('movimientoInventario/crear', {
      title: 'Registrar Movimiento de Inventario',
      error: '❌ Error: ' + error.message,
      productos,
      bodegas
    });
  }
};