const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // asegúrate de exportar correctamente sequelize

const Cliente = sequelize.define('Cliente', {
  ClienteID: {
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
  Telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'Cliente',
  timestamps: false
});

module.exports = Cliente;
