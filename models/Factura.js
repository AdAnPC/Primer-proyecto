module.exports = (sequelize, DataTypes) => {
  const Factura = sequelize.define('Factura', {
    FacturaID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FechaFactura: { type: DataTypes.DATE, allowNull: false },
    ClienteID: { type: DataTypes.INTEGER, allowNull: false },
    TotalFactura: { type: DataTypes.DECIMAL, allowNull: false },
    Estado: { type: DataTypes.BOOLEAN, allowNull: false },
    MetodoPago: { type: DataTypes.STRING(50), allowNull: false },

    // Campo para inhabilitar sin eliminar
    Activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: 'Factura',
    timestamps: false
  });

  Factura.associate = (models) => {
    Factura.belongsTo(models.Cliente, {
      foreignKey: 'ClienteID',
      as: 'cliente'
    });

    // También puedes agregar asociación con DetalleFactura si lo necesitas:
    Factura.hasMany(models.DetalleFactura, {
      foreignKey: 'FacturaID',
      as: 'DetalleFacturas'
    });
  };

  return Factura;
};
