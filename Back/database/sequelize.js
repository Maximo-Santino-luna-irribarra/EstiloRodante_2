// Back/database/sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('estilorodante', 'root', 'Frias5033', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
  .then(() => console.log('Conectado con Sequelize'))
  .catch(err => console.error('Error al conectar con Sequelize:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas con Sequelize'))
  .catch(err => console.error('Error al sincronizar tablas:', err));

export default sequelize;

