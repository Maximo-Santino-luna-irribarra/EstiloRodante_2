import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Encuesta = sequelize.define('encuestaOmitida', {
  nombre: DataTypes.STRING
},
{
  tableName: 'encuestas'
});

export default EncuestaOmitida;
