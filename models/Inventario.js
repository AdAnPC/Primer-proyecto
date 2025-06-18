// models/Inventario.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Asegúrate de que este archivo exporta la instancia sequelize

const Inventario = sequelize.define('Inventario', {
  InventarioID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FechaIngreso: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FechaSalida: {
    type: DataTypes.DATE,
    allowNull: true
  },
  BodegaID: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Inventario',
  timestamps: false
});

// Relaciones (debes asegurarte de que Producto y Bodega estén definidos antes de esto)
const Producto = require('./Producto');
const Bodega = require('./Bodeja');

Inventario.belongsTo(Producto, { foreignKey: 'ProductoID' });
Inventario.belongsTo(Bodega, { foreignKey: 'BodegaID' });

module.exports = Inventario;
