import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const LogAdmin = sequelize.define('log_admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'log_admin',
  timestamps: false
});

export default LogAdmin;
