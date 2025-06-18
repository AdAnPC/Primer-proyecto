require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL exitosa.');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
}

connectDB();

module.exports = sequelize;
