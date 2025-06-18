const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sequelize = require('./models/index');

sequelize.authenticate()
  .then(() => console.log('Conexión a MySQL establecida correctamente.'))
  .catch(err => console.error('No se pudo conectar a MySQL:', err));

const indexRouter = require('./routes/index');
const proveedorRuta = require('./routes/proveedor');
// const testRouter = require('./routes/test');
const panelRuta = require('./routes/panel')
const productoRuta = require('./routes/producto');
const ventaRuta = require('./routes/venta');
const usuarioRoutes = require('./routes/usuario');

const productosRouter = require('./routes/producto');
const inventarioRoutes = require('./routes/inventario');
const categoriaGastoRoutes = require('./routes/categoriaGasto');
const categoriaRoutes = require('./routes/Categoria');
const clienteRoutes = require('./routes/cliente');
const bodegaRoutes = require('./routes/bodega');
const gastoRoutes = require('./routes/gasto');
const compraRoutes = require('./routes/compra');
const movimientoInventarioRoutes = require('./routes/movimientoInventario');
const facturaRoutes = require('./routes/factura');





const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ✅ Configura express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Establece el layout por defecto

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'claveSecretaSuperSegura', // cámbiala por una secreta de verdad
  resave: false,
  saveUninitialized: false,
}));
// Rutas
app.use('/', indexRouter);
app.use('/usuario', usuarioRoutes);
// app.use('/test', testRouter);
app.use('/panel',panelRuta);

app.use('/venta',ventaRuta);
app.use('/inventario', inventarioRoutes);
app.use('/proveedor',proveedorRuta);

app.use('/producto', productosRouter);
app.use('/categoriaGasto', categoriaGastoRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/cliente', clienteRoutes);
app.use('/bodega', bodegaRoutes);
app.use('/gasto', gastoRoutes);
app.use('/compra', compraRoutes);
app.use('/movimientoInventario', movimientoInventarioRoutes);
app.use('/factura', facturaRoutes);





// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
