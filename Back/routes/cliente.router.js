// Back/routes/cliente.routes.js
import express from 'express';
import {
    getAllClientes,
    getCliente,
    postCliente,
    putCliente,
    deleteCliente
} from '../controllers/clientes.controllers.js';

const router = express.Router();

router.get('/', getAllClientes);

router.get('/:id', getCliente);

router.post('/', postCliente);

router.put('/:id', putCliente);

router.delete('/:id', deleteCliente);

export default router;
