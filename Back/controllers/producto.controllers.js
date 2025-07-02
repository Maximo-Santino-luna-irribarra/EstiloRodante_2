// Back/controllers/producto.controller.js
import * as productoservice from '../service/producto.service.js';

export const getAllProductos = async (req, res) => {
    const productos = await productoservice.getProductos();
    res.json(productos);
};

export const getProducto = async (req, res) => {

    const producto = await productoservice.getProductoById(req.params.id);

    if (!producto) return res.status(404).json({ error: 'Producto no encontrada' });
    // Si la producto no se encuentra, se devuelve un error 404
    res.json(producto);

};

export const postProducto = async (req, res) => {

    const nueva = await productoservice.createProducto(req.body);

    res.status(201).json(nueva);
};

export const putProducto = async (req, res) => {

    const actualizada = await productoservice.updateProducto(req.params.id, req.body);
    // Actualiza la producto con los datos proporcionados en el cuerpo de la solicitud
    if (!actualizada) return res.status(404).json({ error: 'Producto no encontrada' });
    // Si la producto no se encuentra, se devuelve un error 404

    // Si se encuentra, se devuelve la producto actualizada en formato JSON
    res.json(actualizada);
};

export const deleteProducto = async (req, res) => {

    const eliminada = await productoservice.deleteProducto(req.params.id);
    // Elimina la producto con el ID proporcionado en los parámetros de la solicitud
    if (!eliminada) return res.status(404).json({ error: 'Producto no encontrada' });
    // Si la producto no se encuentra, se devuelve un error 404
    res.json({ message: 'Producto eliminada correctamente' });
};
