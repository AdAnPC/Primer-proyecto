const express = require('express');
const router = express.Router();

const { Usuario, Venta, Bodega,Compra, Producto, Inventario, Cliente, Factura , CategoriaGasto,Proveedor } = require('../models');

router.get('/mostrar', async (req, res) => {
  try {
    // Aquí haces consultas a la base de datos según lo que quieras mostrar
    const ventas = await Venta.findAll(); // ejemplo
    const facturas = await Factura.findAll(); // ejemplo

    res.render('mostrarIformes/mostrar', {
      ventas,
      facturas
    });

  } catch (error) {
    console.error('Error al mostrar informe:', error);
    res.status(500).send('Error al mostrar informe');
  }
});

module.exports = router;
