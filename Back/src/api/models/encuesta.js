import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Encuesta = sequelize.define('encuesta', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  telefono: DataTypes.STRING,
  opinion: DataTypes.STRING,
  puntuacion: DataTypes.INTEGER,
},
{
  tableName: 'encuestas'
});

export default Encuesta;
