const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // tu conexión Sequelize

const Bodega = sequelize.define('Bodega', {
  BodegaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Direccion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'Bodega',
  timestamps: false
});

module.exports = Bodega;
