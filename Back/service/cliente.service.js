
// Back/services/cliente.service.js
import Cliente from '../models/cliente.js';

export const getClientes = async () => await Cliente.findAll();

export const getClienteById = async (id) => await Cliente.findByPk(id);

export const createCliente = async (data) => await Cliente.create(data);

export const updateCliente = async (id, data) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    return await cliente.update(data);
};

export const deleteCliente = async (id) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    await cliente.destroy();
    return true;
};

export default {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};  