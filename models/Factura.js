// models/Factura.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Factura = sequelize.define('Factura', {
  FacturaID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FechaFactura: { type: DataTypes.DATE, allowNull: false },
  ClienteID: { type: DataTypes.INTEGER, allowNull: false },
  TotalFactura: { type: DataTypes.DECIMAL, allowNull: false },
  Estado: { type: DataTypes.BOOLEAN, allowNull: false },
  MetodoPago: { type: DataTypes.STRING(50), allowNull: false }
}, {
  tableName: 'Factura',
  timestamps: false
});

module.exports = Factura;
