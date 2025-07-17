import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';
import Admin from './admin.js'; 
const LogAdmin = sequelize.define('log_admin', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Admin,
        key: 'id'
    }
    },
    fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
    }
});

Admin.hasMany(LogAdmin, { foreignKey: 'adminId' });
LogAdmin.belongsTo(Admin, { foreignKey: 'adminId' });

export default LogAdmin;