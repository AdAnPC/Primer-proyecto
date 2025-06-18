const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // tu archivo de conexión Sequelize

const Usuario = sequelize.define('Usuario', {
  UsuarioID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NombreUsuario: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Contraseña: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Rol: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

module.exports = Usuario;
