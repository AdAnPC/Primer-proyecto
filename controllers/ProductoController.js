const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria'); // Usamos la tabla categoria

// Mostrar formulario
exports.mostrarFormulario = async (req, res) => {
  try {
    const categorias = await Categoria.findAll(); // Obtenemos categorías
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
    UnidadMedida, CategoriaID, StockMinimo, Activo
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
    const categoria = await Categoria.findByPk(CategoriaID);
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
      CategoriaID: parseInt(CategoriaID),
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

