const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // conexión a Sequelize

const Compra = sequelize.define('Compra', {
  CompraID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FechaCompra: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ProveedorID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CantidadComprada: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PrecioCompra: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  TotalCompra: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  tableName: 'Compra',
  timestamps: false
});

module.exports = Compra;
