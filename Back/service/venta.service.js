// Back/services/venta.service.js
import Venta from '../models/venta.js';

// Obtener ventas
export const getVentas = async () => await Venta.findAll();

// Obtener venta por ID
export const getVentaById = async (id) => await Venta.findByPk(id);

// Crear venta
export const createVenta = async (data) => await Venta.create(data);

// Actualizar venta
export const updateVenta = async (id, data) => {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;
    return await venta.update(data);
};

// Eliminar Venta
export const deleteVenta = async (id) => {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;
    await venta.destroy();
    return true;
};