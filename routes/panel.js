const express = require('express');
const router = express.Router();
const panelController = require('../controllers/PanelController');

// Si usas autenticación:
// const isAuthenticated = require('../middlewares/auth');

router.get('/', panelController.mostrarPanel);

module.exports = router;
