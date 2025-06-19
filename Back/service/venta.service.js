// Back/services/venta.service.js
import Venta from '../models/venta.js';

export const getVentas = async () => await Venta.findAll();

export const getVentaById = async (id) => await Venta.findByPk(id);

export const createVenta = async (data) => await Venta.create(data);

export const updateVenta = async (id, data) => {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;
    return await venta.update(data);
};

export const deleteVenta = async (id) => {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;
    await venta.destroy();
    return true;
};