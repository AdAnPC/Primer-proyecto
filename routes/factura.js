const express = require('express');
const router = express.Router();
const FacturaController = require('../controllers/FacturaController');

router.get('/crear', FacturaController.mostrarFormulario);
router.post('/crear', FacturaController.crearFactura);

module.exports = router;
