import express from 'express';
import {
    getAllLlantas,
    getLlanta,
    postLlanta,
    putLlanta,
    deleteLlanta
} from '../controllers/llanta.controllers.js';

const router = express.Router();

router.get('/', getAllLlantas);

router.get('/:id', getLlanta);

router.post('/', postLlanta);

router.put('/:id', putLlanta);

router.delete('/:id', deleteLlanta);

export default router;
