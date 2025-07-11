import Venta        from '../models/venta.js';
import DetalleVenta from '../models/DetalleVenta.js';
import Producto     from '../models/producto.js';
import sequelize    from '../../config/sequelize.js';

Venta.hasMany(DetalleVenta, {
  foreignKey: 'venta_id',
  sourceKey:  'id',
  as:         'detalles'  
});
DetalleVenta.belongsTo(Venta, {
  foreignKey: 'venta_id',
  targetKey:  'id',
  as:         'venta'   
});

Producto.hasMany(DetalleVenta, {
  foreignKey: 'producto_id',
  sourceKey:  'id',
  as:         'ventasDetalle'
});
DetalleVenta.belongsTo(Producto, {
  foreignKey: 'producto_id',
  targetKey:  'id',
  as:         'producto' 
});

export {
  sequelize,
  Producto,
  Venta,
  DetalleVenta
};
