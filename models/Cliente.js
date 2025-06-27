module.exports = (sequelize, DataTypes) => {
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
    Direccion: DataTypes.STRING(255),
    Telefono: DataTypes.STRING(20),
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

  Cliente.associate = (models) => {
    Cliente.hasMany(models.Factura, {
      foreignKey: 'ClienteID',
      as: 'facturas'
    });
  };

  return Cliente;
};
