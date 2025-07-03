import Venta from '../models/venta.js';
import DetalleVenta from '../models/DetalleVenta.js';

export const getVentas = async () => {
    return await Venta.findAll({
    include: DetalleVenta
    });
};

export const getVentaById = async (id) => {
    return await Venta.findByPk(id, {
    include: DetalleVenta
    });
};

export const createVenta = async (data) => {
    const { nombre_cliente, productos } = data;
    const nuevaVenta = await Venta.create({ nombre_cliente });

    for (const item of productos) {
        await DetalleVenta.create({
            venta_id: nuevaVenta.id,
            producto_id: item.producto_id,
            tipo_producto: item.tipo_producto,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario,
            subtotal: item.cantidad * item.precio_unitario
            });
    }

    return nuevaVenta;
};

export const deleteVenta = async (id) => {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;

    await DetalleVenta.destroy({ where: { venta_id: id } });
    await venta.destroy();

    return true;
};
