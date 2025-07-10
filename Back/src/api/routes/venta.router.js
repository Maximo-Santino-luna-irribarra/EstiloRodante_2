import express from 'express';
import {
  getAllVentas,
  getVenta,
  postVenta,
  deleteVenta
} from '../controllers/venta.controllers.js';

const router = express.Router();

router.get('/', getAllVentas);

router.get('/:id', getVenta);

router.post('/', postVenta);

router.delete('/:id', deleteVenta);

export default router;