module.exports = (sequelize, DataTypes) => {
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

  // Si en el futuro necesitas asociar Usuario con otras tablas, hazlo aquí:
  Usuario.associate = (models) => {
    // Por ejemplo:
    // Usuario.hasMany(models.Factura, { foreignKey: 'UsuarioID', as: 'facturas' });
  };

  return Usuario;
};
