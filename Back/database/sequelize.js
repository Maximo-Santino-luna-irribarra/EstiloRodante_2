// Back/database/sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('estilorodante', 'root', '3197', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default sequelize;

