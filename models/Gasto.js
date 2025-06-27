module.exports = (sequelize, DataTypes) => {
  const Gasto = sequelize.define('Gasto', {
    GastoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FechaGasto: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Monto: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    CategoriaGastoID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Gasto',
    timestamps: false
  });

  Gasto.associate = (models) => {
    Gasto.belongsTo(models.CategoriaGasto, {
      foreignKey: 'CategoriaGastoID',
      as: 'categoria'
    });
  };

  return Gasto;
};
