import {Router} from 'express';
import clientesControllers from '../controllers/clientes.controllers.js';


const router = Router()

router.get('/{:id}', clientesControllers.getCombined)

router.post('/', clientesControllers.createCliente)

router.put('/:id', clientesControllers.updateCliente)

router.delete('/:id', clientesControllers.deletedCliente)

export default router
