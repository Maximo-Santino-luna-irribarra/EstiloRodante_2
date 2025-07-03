import * as clienteservice from '../service/cliente.service.js';
//../controllers/clientes.controllers.js
export const getAllClientes = async (req, res) => {
    const clientes = await clienteservice.getClientes();
    res.json(clientes);
};
// Busca un cliente por su ID
export const getCliente = async (req, res) => {

    const cliente = await clienteservice.getClienteById(req.params.id);

    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    res.json(cliente);
};
 // Crea un nuevo cliente con los datos proporcionados en el cuerpo de la solicitud
export const postCliente = async (req, res) => {
    
    const nuevo = await clienteservice.createCliente(req.body);

    res.status(201).json(nuevo);
};
// Actualiza un cliente con los datos proporcionados en el cuerpo de la solicitud
export const putCliente = async (req, res) => {
    
    const actualizado = await clienteservice.updateCliente(req.params.id, req.body);

    if (!actualizado) return res.status(404).json({ error: 'Cliente no encontrado' });

    res.json(actualizado);
};
// Elimina un cliente con el ID proporcionado en los parámetros de la solicitud
export const deleteCliente = async (req, res) => {

    const eliminado = await clienteservice.deleteCliente(req.params.id);

    if (!eliminado) return res.status(404).json({ error: 'Cliente no encontrado' });
    
    res.json({ message: 'Cliente eliminado correctamente' });
};

