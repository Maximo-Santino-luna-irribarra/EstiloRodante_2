import express from 'express';
import {
    getAllProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto,
    getProductosPaginados
} from '../controllers/producto.controllers.js';

const router = express.Router();

router.get('/', getAllProductos);

router.get('/paginados',getProductosPaginados);

router.get('/:id', getProducto);



router.post('/', postProducto);

router.put('/:id', putProducto);

router.delete('/:id', deleteProducto);

export default router;
