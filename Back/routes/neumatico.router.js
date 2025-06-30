import express from 'express';
import {
    getAllNeumaticos,
    getNeumatico,
    postNeumatico,
    putNeumatico,
    deleteNeumatico,
    listarPaginado
} from '../controllers/neumatico.controllers.js';

const router = express.Router();

router.get('/', getAllNeumaticos);

router.get('/:id', getNeumatico);

router.get('/neumaticos', listarPaginado);

router.post('/', postNeumatico);

router.put('/:id', putNeumatico);

router.delete('/:id', deleteNeumatico);

export default router;
