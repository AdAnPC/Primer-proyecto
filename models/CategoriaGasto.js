const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Asegúrate que esta es tu instancia de Sequelize

const CategoriaGasto = sequelize.define('CategoriaGasto', {
  CategoriaGastoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'CategoriaGasto',
  timestamps: false
});

module.exports = CategoriaGasto;
