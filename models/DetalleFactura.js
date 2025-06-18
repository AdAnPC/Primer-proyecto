// models/DetalleFactura.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const DetalleFactura = sequelize.define('DetalleFactura', {
  DetalleID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FacturaID: { type: DataTypes.INTEGER, allowNull: false },
  ProductoID: { type: DataTypes.INTEGER, allowNull: false },
  CantidadVendida: { type: DataTypes.INTEGER, allowNull: false },
  PrecioVenta: { type: DataTypes.DECIMAL, allowNull: false }
}, {
  tableName: 'DetalleFactura',
  timestamps: false
});

module.exports = DetalleFactura;
