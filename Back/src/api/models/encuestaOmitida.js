import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const EncuestaOmitida = sequelize.define('encuestaOmitida', {
  nombre: DataTypes.STRING
},
{
  tableName: 'encuestasOmitidas'
});

export default EncuestaOmitida;
