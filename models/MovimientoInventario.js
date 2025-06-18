const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // conexión Sequelize

const MovimientoInventario = sequelize.define('MovimientoInventario', {
  MovimientoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  FechaMovimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CantidadMovida: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TipoMovimiento: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  BodegaID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'MovimientoInventario',
  timestamps: false
});

module.exports = MovimientoInventario;
