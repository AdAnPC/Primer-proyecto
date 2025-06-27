
const { Usuario, Venta, Bodega,Compra,MovimientoInventario, Producto, DetalleFactura, Factura, Inventario, Cliente , Gasto,CategoriaGasto,Proveedor } = require('../models');

// Mostrar formulario
console.log('CategoriaGasto:', CategoriaGasto);

exports.mostrarFormulario = async (req, res) => {
  try {
    const categorias = await CategoriaGasto.findAll(); // Obtenemos categorías
    res.render('producto/crear', {
      title: 'Crear Producto',
      categorias,
      CategoriaID: ''
    });
  } catch (error) {
    console.error('Error al cargar categorías:', error);
    res.render('producto/crear', {
      title: 'Crear Producto',
      categorias: [],
      error: '❌ No se pudieron cargar las categorías',
      CategoriaID: ''
    });
  }
};



// Crear producto
exports.crearProducto = async (req, res) => {
  const {
    Nombre, Descripcion, PrecioCompra, PrecioVenta,
    UnidadMedida, CategoriaGastoID, StockMinimo, Activo
  } = req.body;

  try {
    const categorias = await Categoria.findAll();

    // Verifica si ya existe un producto con el mismo nombre
    const productoExistente = await Producto.findOne({
      where: { Nombre }
    });

    if (productoExistente) {
      return res.render('producto/crear', {
        title: 'Crear Producto',
        error: `❌ Ya existe un producto con el nombre "${Nombre}". Intente Crear Otro`,
        categorias,
        ...req.body
      });
    }

    // Verifica si la categoría es válida
    const categoria = await Categoria.findByPk(CategoriaGastoID);
    if (!categoria) {
      return res.render('producto/crear', {
        title: 'Crear Producto',
        error: '❌ Categoría no válida.',
        categorias,
        ...req.body
      });
    }

    // Crear el producto
    await Producto.create({
      Nombre,
      Descripcion,
      PrecioCompra,
      PrecioVenta,
      UnidadMedida,
      CategoriaGastoID: parseInt(CategoriaGastoID),
      StockMinimo,
      Activo: Activo === 'on'
    });

    res.render('producto/crear', {
      title: 'Crear Producto',
      success: `✅ El producto "${Nombre}" fue creado correctamente.`,
      categorias,
      CategoriaID: ''
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    const categorias = await Categoria.findAll();
    res.render('producto/crear', {
      title: 'Crear Producto',
      error: '❌ Hubo un problema al guardar el producto.',
      categorias,
      ...req.body
    });
  }
};




exports.mostrarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: {
        model: CategoriaGasto,
        as: 'categoria',
        attributes: ['Nombre']
      }
    });

    res.render('producto/mostrar', { productos });
  } catch (error) {
    console.error('Error al mostrar productos:', error);
    res.status(500).send('Error al mostrar productos');
  }
};