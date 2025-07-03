// Back/services/llanta.service.js
import Producto from '../models/producto.js';
import { Op } from 'sequelize';

// Obtener productos
export const getProductos = async () => await Producto.findAll();

// Obtener producto por ID
export const getProductoById = async (id) => await Producto.findByPk(id);

// Crear producto
export const createProducto = async (data) => await Producto.create(data);

// Actualizar producto
export const updateProducto = async (id, data) => {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
        return await producto.update(data);
};

// Eliminar producto
export const deleteProducto = async (id) => {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
        await producto.destroy();
        return true;
};

// Generar Paginado y filtrado
export const productoPaginados = async (page, limit, filtros) => {
    const offset = (page - 1) * limit;

    const where = {};

    if (filtros.marca && filtros.marca !== 'Todos') {
        where.marca = filtros.marca;
    }

    if (filtros.categoria && filtros.categoria !== 'Todos') {
        where.categoria = filtros.categoria;
    }

    if (filtros.estado && filtros.estado !== 'Todos') {
        where.activo = filtros.estado === 'Activo';
    }

    if (filtros.min || filtros.max) {
        where.precio = {
        [Op.gte]: filtros.min || 0,
        [Op.lte]: filtros.max || Number.MAX_SAFE_INTEGER,
        };
    }

    if (filtros.busqueda) {
        where.nombre = {
        [Op.iLike]: `%${filtros.busqueda}%`,
        };
    }

    const { count, rows } = await Producto.findAndCountAll({
        where,
        offset,
        limit,
        order: [['createdAt', 'DESC']],
    });

    return {
        total: count,
        productos: rows,
    };
};
