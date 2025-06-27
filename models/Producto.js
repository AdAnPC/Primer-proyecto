module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    ProductoID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PrecioCompra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    PrecioVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    UnidadMedida: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CategoriaGastoID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    StockMinimo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Producto',
    timestamps: false
  });

  Producto.associate = (models) => {
    Producto.belongsTo(models.CategoriaGasto, {
      foreignKey: 'CategoriaGastoID',
      as: 'categoria'
    });

    // Asociaciones adicionales si las usas:
    Producto.hasMany(models.DetalleFactura, {
      foreignKey: 'ProductoID',
      as: 'detallesFactura'
    });

    Producto.hasMany(models.Compra, {
      foreignKey: 'ProductoID',
      as: 'compras'
    });

    Producto.hasMany(models.Inventario, {
      foreignKey: 'ProductoID',
      as: 'inventarios'
    });

    Producto.hasMany(models.MovimientoInventario, {
      foreignKey: 'ProductoID',
      as: 'movimientos'
    });
  };

  return Producto;
};
