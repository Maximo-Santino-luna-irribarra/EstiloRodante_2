import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Producto = sequelize.define('productos', {
  

  nombre: DataTypes.STRING,
  marca: DataTypes.STRING,
  categoria: DataTypes.STRING,
  modelo: DataTypes.STRING,
  medida: DataTypes.STRING,
  activo: DataTypes.BOOLEAN,
  urlIMG: DataTypes.STRING,
  precio: DataTypes.INTEGER,
  stock: DataTypes.INTEGER
},
{
  tableName: 'productos'
});

export default Producto;