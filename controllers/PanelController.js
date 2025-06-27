const moment = require('moment');
const { Op } = require('sequelize');
const { Usuario, Venta, Producto, Cliente, Factura } = require('../models');

exports.mostrarPanel = async (req, res) => {
  try {
    const totalUsuarios = await Usuario.count();
    const ingresosTotales = await Factura.sum('TotalFactura') || 0;
    const totalFacturas = await Factura.count();
    const totalClientes = await Cliente.count();

    const tasaConversion = totalClientes > 0
      ? ((totalFacturas / totalClientes) * 100).toFixed(2)
      : 0;

    const ventas = await Venta.findAll({
      include: {
        model: Producto,
        as: 'producto',
        attributes: ['PrecioCompra']
      }
    });

    let totalGanancias = 0;
    for (let venta of ventas) {
      const ingreso = venta.CantidadVendida * venta.PrecioVenta;
      const costo = venta.CantidadVendida * (venta.producto?.PrecioCompra || 0);
      totalGanancias += ingreso - costo;
    }

    const ultimosMeses = 6;
    const hoy = moment();
    const labels = [];
    const dataVentas = [];

    for (let i = ultimosMeses - 1; i >= 0; i--) {
      const inicio = moment(hoy).subtract(i, 'months').startOf('month').format('YYYY-MM-DD');
      const fin = moment(hoy).subtract(i, 'months').endOf('month').format('YYYY-MM-DD');
      const label = moment(hoy).subtract(i, 'months').format('MMM YYYY');

      const totalMes = await Venta.sum('TotalVenta', {
        where: {
          FechaVenta: {
            [Op.between]: [inicio, fin]
          }
        }
      }) || 0;

      labels.push(label);
      dataVentas.push(parseFloat(totalMes.toFixed(2)));
    }

    res.render('panel', {
      totalUsuarios,
      ingresosTotales,
      totalGanancias,
      totalSesiones: 0,
      tasaConversion,
      labels,
      dataVentas
    });

  } catch (error) {
    console.error('Error al cargar el panel:', error);
    res.status(500).send('Error al cargar el panel: 500 ' + error.message);
  }
};
