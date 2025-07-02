import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Venta = sequelize.define('detalle_ventas', {
  nombre_cliente:{
    type: DataTypes.STRING,
    allowNull: false
  },
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
  precio_unitario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_venta: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'detalle_ventas'
});

export default Venta;