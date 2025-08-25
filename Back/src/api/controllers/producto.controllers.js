// Back/controllers/producto.controller.js
import * as productoservice from '../service/producto.service.js';

export const getAllProductos = async (req, res) => {
  try{
    const productos = await productoservice.getProductos();
    res.status(200).json(productos);
  }catch(error){
        console.error('Error al obtener Productos:', error)
        res.status(500).json({ error:'Error del servidor' })
  }
};

export const getProducto = async (req, res) => {
  try{
    const producto = await productoservice.getProductoById(req.params.id);

    if (!producto) return res.status(404).json({ error: 'Producto no encontrada' });
    // Si la producto no se encuentra, se devuelve un error 404
    res.status(200).json(producto);
  }catch(error){
        console.error('Error al obtener Producto:', error)
        res.status(500).json({ error:'Error del servidor' })
  }
};

export const postProducto = async (req, res) => {
  try{
    const nueva = await productoservice.createProducto(req.body);

    res.status(201).json(nueva);
  }catch(error){
      console.error('Error al crear el Producto:', error)
      res.status(500).json({ error:'Error del servidor' })
  }
};

// controllers/producto.controller.js
export const putProducto = async (req, res) => {
  try {
    // Si subís archivo, manejalo con multer
    const datos = {
      nombre: req.body.nombre,
      marca: req.body.marca,
      modelo: req.body.modelo,
      medida: req.body.medida,
      precio: parseInt(req.body.precio),
      stock: parseInt(req.body.stock),
      urlIMG: req.file ? `/uploads/${req.file.filename}` : req.body.urlIMG
    };

    const actualizada = await productoservice.updateProducto(req.params.id, datos);

    if (!actualizada) {
      return res.status(404).send('Producto no encontrado');
    }

    res.json({ success: true, producto: actualizada });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).send('Error al actualizar producto');
  }
};


export const deleteProducto = async (req, res) => {
  try{
    const eliminada = await productoservice.deleteProducto(req.params.id);
      // Elimina la producto con el ID proporcionado en los parámetros de la solicitud
        if (!eliminada) return res.status(404).json({ error: 'Producto no encontrada' });
      // Si la producto no se encuentra, se devuelve un error 404
      res.status(201).json({ message: 'Producto eliminada correctamente' });
  }catch(error){
      console.error('Error al eliminar el Producto:', error)
      res.status(500).json({ error:'Error del servidor' })
  }
};


export const getProductosPaginados = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filtros = {
    marca: req.query.marca,
    categoria: req.query.categoria,
    estado: req.query.estado,
    min: parseFloat(req.query.min),
    max: parseFloat(req.query.max),
    busqueda: req.query.busqueda,
  };

  try {
    const resultado = await productoservice.productoPaginados(page, limit, filtros);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos paginados con filtros' });
  }
};

export const renderEditar = async (req, res) => {
  try {
    const producto = await productoservice.getProductoById(req.params.id);
    if (!producto) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('editar', { producto });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
};