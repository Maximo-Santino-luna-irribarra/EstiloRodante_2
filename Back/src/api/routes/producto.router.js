import express from 'express';
import multer from 'multer';
import {
    getAllProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto,
    getProductosPaginados
} from '../controllers/producto.controllers.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Ruta para obtener todos los productos
router.get('/', getAllProductos);

// Ruta para obtener pagina
router.get('/paginados',getProductosPaginados);

// Ruta para obtener producto por ID
router.get('/:id', getProducto);

// Ruta para crear producto
router.post('/', postProducto);

// Ruta para actualizar producto
router.put('/:id', upload.single('imagen'), putProducto);

// Ruta para eliminar producto por ID
router.delete('/:id', deleteProducto);

export default router;
