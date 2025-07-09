// Back/database/sequelize.js

import { Sequelize } from 'sequelize';

import {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} from '../config/envConfig.js'

// coneccion a la base de datos
export const sequelize = new Sequelize(

  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
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

