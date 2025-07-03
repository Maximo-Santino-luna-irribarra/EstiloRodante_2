// Back/routes/venta.routes.js
import express from 'express';
import {
  getAllVentas,
  getVenta,
  postVenta,
  putVenta,
  deleteVenta
} from '../controllers/venta.controllers.js';

const router = express.Router();

// Ruta para obtener todas las ventas
router.get('/', getAllVentas);

// Ruta para obtener venta por ID
router.get('/:id', getVenta);

// Ruta para crear venta
router.post('/', postVenta);

// Ruta para actualizar venta
router.put('/:id', putVenta);

// Ruta para eliminar venta por ID
router.delete('/:id', deleteVenta);

export default router;
