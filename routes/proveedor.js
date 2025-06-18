const express = require('express');
const router = express.Router();
const ProveedorController = require('../controllers/ProveedoresController');

router.get('/crear', (req, res) => {
  res.render('proveedor/crear', { title: 'Registrar Proveedor' });
});

router.post('/crear', ProveedorController.crearProveedor);

module.exports = router;
