// Back/services/llanta.service.js
import Producto from '../models/producto.js';

export const getProductos = async () => await Producto.findAll();

export const getProductoById = async (id) => await Producto.findByPk(id);

export const createProducto = async (data) => await Producto.create(data);


export const updateProducto = async (id, data) => {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    return await producto.update(data);
};

export const deleteProducto = async (id) => {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    await producto.destroy();
    return true;
};

export const productoPaginados = async (page, limit) => {
    const offset = (page - 1) * limit;
    const productos = await Producto.findAll({
        offset: offset,
        limit: limit,
        order: [['createdAt', 'DESC']]
    });
    return productos;
}

