import {Router} from 'express';
import llantaControllers from '../controllers/llanta.controllers.js';

const router = Router();


router.get('/{:id}', llantaControllers.getCombined);

router.post('/', llantaControllers.createLlanta);

router.put('/:id', llantaControllers.updateLlanta);

router.delete('/:id', llantaControllers.deletedLlanta);

export default router;