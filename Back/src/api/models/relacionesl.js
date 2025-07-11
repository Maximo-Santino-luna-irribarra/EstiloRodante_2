import Venta from './venta.js';
import DetalleVenta from './DetalleVenta.js';
import Producto from './producto.js';

Venta.hasMany(DetalleVenta, {
  foreignKey: 'venta_id',
  as: 'detalles'
});
DetalleVenta.belongsTo(Venta, {
  foreignKey: 'venta_id',
  as: 'venta'
});

DetalleVenta.belongsTo(Producto, { foreignKey: 'producto_id' });