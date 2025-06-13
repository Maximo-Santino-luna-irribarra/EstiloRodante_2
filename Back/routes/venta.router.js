import {Router} from 'express';
import ventaController from '../controllers/venta.controllers.js'

const router = Router()

router.get('/{:id}', ventaController.getCombined)

router.post('/', ventaController.createVenta)

router.put('/{:id}', ventaController.updateVenta)

router.delete('/:id', ventaController.deleteVenta)

export default router
