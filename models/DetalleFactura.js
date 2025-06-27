module.exports = (sequelize, DataTypes) => {
  const DetalleFactura = sequelize.define('DetalleFactura', {
    DetalleID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FacturaID: { type: DataTypes.INTEGER, allowNull: false },
    ProductoID: { type: DataTypes.INTEGER, allowNull: false },
    CantidadVendida: { type: DataTypes.INTEGER, allowNull: false },
    PrecioVenta: { type: DataTypes.DECIMAL, allowNull: false }
  }, {
    tableName: 'DetalleFactura',
    timestamps: false
  });

  DetalleFactura.associate = (models) => {
    DetalleFactura.belongsTo(models.Factura, {
      foreignKey: 'FacturaID',
      as: 'factura'
    });

    DetalleFactura.belongsTo(models.Producto, {
      foreignKey: 'ProductoID',
      as: 'producto'
    });
  };

  return DetalleFactura;
};
