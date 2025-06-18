const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Venta = sequelize.define('Venta', {
  VentaID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  FechaVenta: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ClienteID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CantidadVendida: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PrecioVenta: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  TotalVenta: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  UsuarioID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Venta',
  timestamps: false
});

module.exports = Venta;
