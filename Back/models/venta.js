import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Venta = sequelize.define('detalle_ventas', {
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  timestamps: false,
  tableName: 'detalle_ventas'
});

export default Venta;
