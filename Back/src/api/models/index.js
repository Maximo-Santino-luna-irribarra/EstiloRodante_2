// Back/src/api/models/relaciones.js
import sequelize    from '../../config/sequelize.js';
import Producto     from '../models/producto.js';
import Venta        from '../models/venta.js';
import DetalleVenta from '../models/DetalleVenta.js';

// Defino asociaciones
Venta.hasMany( DetalleVenta, {
  foreignKey: 'venta_id',
  sourceKey:  'id',
  as:         'items'
});
DetalleVenta.belongsTo( Venta, {
  foreignKey: 'venta_id',
  targetKey:  'id',
  as:         'venta'
});

Producto.hasMany( DetalleVenta, {
  foreignKey: 'producto_id',
  sourceKey:  'id',
  as:         'ventasDetalle'
});
DetalleVenta.belongsTo( Producto, {
  foreignKey: 'producto_id',
  targetKey:  'id',
  as:         'producto'
});

// Exporto con ES Modules
export {
  sequelize,
  Producto,
  Venta,
  DetalleVenta
};
