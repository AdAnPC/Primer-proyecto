module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define('Compra', {
    CompraID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FechaCompra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ProveedorID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductoID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CantidadComprada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PrecioCompra: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    TotalCompra: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'Compra',
    timestamps: false
  });

 Compra.associate = (models) => {
    Compra.belongsTo(models.Producto, { foreignKey: 'ProductoID', as: 'producto' });
    Compra.belongsTo(models.Proveedor, { foreignKey: 'ProveedorID', as: 'proveedor' });
  };


  return Compra;
};
