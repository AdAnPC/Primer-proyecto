module.exports = (sequelize, DataTypes) => {
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

  Inventario.associate = (models) => {
    Inventario.belongsTo(models.Producto, {
      foreignKey: 'ProductoID',
      as: 'producto'
    });

    Inventario.belongsTo(models.Bodega, {
      foreignKey: 'BodegaID',
      as: 'bodega'
    });
  };

  return Inventario;
};
