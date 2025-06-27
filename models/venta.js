module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
    VentaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    FechaVenta: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ClienteID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductoID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CantidadVendida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PrecioVenta: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    TotalVenta: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    UsuarioID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Venta',
    timestamps: false
  });

  Venta.associate = (models) => {
    Venta.belongsTo(models.Cliente, {
      foreignKey: 'ClienteID',
      as: 'cliente'
    });

    Venta.belongsTo(models.Producto, {
      foreignKey: 'ProductoID',
      as: 'producto'
    });

    Venta.belongsTo(models.Usuario, {
      foreignKey: 'UsuarioID',
      as: 'usuario'
    });
  };


   Venta.associate = (models) => {
    Venta.belongsTo(models.Producto, { foreignKey: 'ProductoID', as: 'producto' });
    Venta.belongsTo(models.Cliente, { foreignKey: 'ClienteID', as: 'cliente' });
    Venta.belongsTo(models.Usuario, { foreignKey: 'UsuarioID', as: 'usuario' });
  };

  return Venta;
};
