import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Admin = sequelize.define('admins', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contra: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  timestamps: false,
  tableName: 'admins'
});

export default Admin;
