// Back/database/sequelize.js

import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();
// coneccion a la base de datos
export const sequelize = new Sequelize(

  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Conectado con Sequelize'))
  .catch(err => console.error('Error al conectar con Sequelize:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas con Sequelize'))
  .catch(err => console.error('Error al sincronizar tablas:', err));

export default sequelize;

