// src/models/DetalleVenta.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const DetalleVenta = sequelize.define('detalle_venta', {
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  venta_id: {                
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
    allowNull: true, 
    defaultValue: DataTypes.NOW
  }},
  {
    timestamps: false,
    tableName: 'detalle_ventas'
  });

export default DetalleVenta;
