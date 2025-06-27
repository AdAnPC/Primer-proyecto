module.exports = (sequelize, DataTypes) => {
  const Bodega = sequelize.define('Bodega', {
    BodegaID: {
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
    }
  }, {
    tableName: 'Bodega',
    timestamps: false
  });

  return Bodega;
};
