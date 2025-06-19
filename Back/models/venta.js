import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Venta = sequelize.define('DetalleVenta', {
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
});

export default Venta;
