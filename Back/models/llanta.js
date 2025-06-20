import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Llanta = sequelize.define('llantas', {
    nombreLLanta: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    material: DataTypes.STRING,
    diametro: DataTypes.INTEGER,
    ancho: DataTypes.INTEGER,
    alto: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    urlIMG: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
},
{
  timestamps: false,
  tableName: 'llantas'
});

export default Llanta;
