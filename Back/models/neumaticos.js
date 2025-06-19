import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Neumatico = sequelize.define('Neumatico', {
  nombreNeumatico: DataTypes.STRING,
  marca: DataTypes.STRING,
  modelo: DataTypes.STRING,
  medida: DataTypes.STRING,
  tecnologia: DataTypes.STRING,
  precio: DataTypes.INTEGER,
  stock: DataTypes.STRING
});

export default Neumatico;
