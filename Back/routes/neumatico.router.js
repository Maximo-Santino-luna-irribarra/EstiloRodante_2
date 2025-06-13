import {Router} from 'express';
import neumaticoController from '../controllers/neumatico.controllers.js'

const router = Router()

router.get('/{:id}', neumaticoController.getCombined)

router.post('/', neumaticoController.createNeumatico)

router.put('/:id', neumaticoController.updateNeumatico)

router.delete('/:id', neumaticoController.deleteNeumatico)

export default router
