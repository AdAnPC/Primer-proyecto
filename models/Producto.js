const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // tu archivo de conexión

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
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  PrecioVenta: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  UnidadMedida: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  CategoriaID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'CategoriaGasto',
      key: 'CategoriaGastoID'
    }
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

module.exports = Producto;
