import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Venta = sequelize.define('venta', {
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_venta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

export default Venta;
