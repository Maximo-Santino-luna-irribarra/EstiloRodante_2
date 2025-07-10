import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Cliente = sequelize.define('clientes', {
  nombreCliente: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  timestamps: false,
  tableName: 'clientes'
});

export default Cliente;
