import express from 'express';
import {
  getAllVentas,
  getVenta,
  postVenta,
  deleteVenta,
  top10Productos,
  top10Ventas
} from '../controllers/venta.controllers.js';

const router = express.Router();

router.get('/', getAllVentas);

router.get('/:id', getVenta);

router.post('/', postVenta);

router.delete('/:id', deleteVenta);

router.get('/top10productos', top10Productos);

router.get('/top10ventas', top10Ventas);

export default router;