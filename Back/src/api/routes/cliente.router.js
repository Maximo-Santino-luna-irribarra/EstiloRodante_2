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

// Ruta para obtener todos los clientes
router.get('/', getAllClientes);

// Ruta para obtener cliente por ID
router.get('/:id', getCliente);


// Ruta para crear cliente
router.post('/', postCliente);

// Ruta para actualizar cliente
router.put('/:id', putCliente);

// Ruta para eliminar cliente por ID
router.delete('/:id', deleteCliente);

export default router;
