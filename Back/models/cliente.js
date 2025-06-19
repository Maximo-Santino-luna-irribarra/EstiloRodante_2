import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Cliente = sequelize.define('Cliente', {
  nombreCliente: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Cliente;
