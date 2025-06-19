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

router.get('/', getAllVentas);
router.get('/:id', getVenta);
router.post('/', postVenta);
router.put('/:id', putVenta);
router.delete('/:id', deleteVenta);

export default router;
