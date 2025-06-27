module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define('Proveedor', {
    ProveedorID: {
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
    tableName: 'Proveedores',
    timestamps: false
  });

  Proveedor.associate = (models) => {
    Proveedor.hasMany(models.Compra, {
      foreignKey: 'ProveedorID',
      as: 'compras'
    });
  };

  return Proveedor;
};
