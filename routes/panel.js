const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth'); // importa el middleware
const db = require('../models'); // Asegúrate que apunte a tu index.js de modelos


router.get('/', async (req, res) => {
  try {
    // Asegúrate de que tienes un modelo llamado Usuario
    const totalUsuarios = await db.Usuario?.count() || 0;
    const ingresosTotales = await db.Factura?.sum('TotalFactura') || 0;
    const totalSesiones = 0; // reemplaza esto si tienes una tabla de sesiones

    const totalFacturas = await db.Factura?.count() || 0;
    const totalClientes = await db.Cliente?.count() || 0;

    const tasaConversion = totalClientes > 0
      ? ((totalFacturas / totalClientes) * 100).toFixed(2)
      : 0;

    res.render('panel', {
      totalUsuarios,
      ingresosTotales,
      totalSesiones,
      tasaConversion
    });

  } catch (error) {
    console.error('Error al cargar el panel:', error);
    res.status(500).send('Error al cargar el panel');
  }
});

module.exports = router;
