const express = require('express');
const router = express.Router();
const FacturaController = require('../controllers/FacturaController');

router.get('/crear', FacturaController.mostrarFormulario);
router.post('/crear', FacturaController.crearFactura);
router.get('/mostrar', FacturaController.mostrarFacturas);


router.post('/cambiar-estado/:id', FacturaController.cambiarEstado);
router.post('/inhabilitar/:id', FacturaController.inhabilitarFactura);

module.exports = router;
