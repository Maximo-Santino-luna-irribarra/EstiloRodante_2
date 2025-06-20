import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Neumatico = sequelize.define('neumaticos', {
  nombreNeumatico: DataTypes.STRING,
  marca: DataTypes.STRING,
  modelo: DataTypes.STRING,
  medida: DataTypes.STRING,
  tecnologia: DataTypes.STRING,
  precio: DataTypes.INTEGER,
  stock: DataTypes.STRING
},
{
  timestamps: false,
  tableName: 'neumaticos'
});

export default Neumatico;
