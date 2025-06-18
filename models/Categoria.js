const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Asegúrate que index.js exporta sequelize

const Categoria = sequelize.define('Categoria', {
  CategoriaID: {
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
  tableName: 'Categoria',
  timestamps: false
});

module.exports = Categoria;
