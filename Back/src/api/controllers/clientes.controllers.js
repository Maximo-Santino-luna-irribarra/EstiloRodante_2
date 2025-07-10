import * as clienteservice from '../service/cliente.service.js';
import {isValidString} from '../helpers/validationHelper.js'

export const getAllClientes = async (req, res) => {
    try{
    const clientes = await clienteservice.getClientes();
    res.status(200).json(clientes);
    }catch(error){
        console.error('Error al obtener Clientes:', error)
        res.status(500).json({ error:'Error del servidor' })
    }
};

// Busca un cliente por su ID
export const getCliente = async (req, res) => {
    try{
    const cliente = await clienteservice.getClienteById(req.params.id);

    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    res.status(200).json(cliente);
    }catch(error){
        console.error('Error al obtener el Cliente:', error)
        res.status(500).json({ error:'Error del servidor' })
    }
};

 // Crea un nuevo cliente con los datos proporcionados en el cuerpo de la solicitud
export const postCliente = async (req, res) => {
    try{
    const {nombreCliente} = req.body
    isValidString(nombreCliente)
    const nuevo = await clienteservice.createCliente({nombreCliente});

    res.status(201).json(nuevo);
    }catch(error){
        console.error('Error al crear Cliente:', error)
        res.status(500).json({ error:'Error del servidor' })
    }
};

// Actualiza un cliente con los datos proporcionados en el cuerpo de la solicitud
export const putCliente = async (req, res) => {
    try{
        const {nombreCliente} = req.body
        isValidString(nombreCliente)
        const actualizado = await clienteservice.updateCliente(req.params.id, {nombreCliente});

        if (!actualizado) return res.status(404).json({ error: 'Cliente no encontrado' });

        res.status(201).json(actualizado);
        }catch(error){
            console.error('Error al actualizar Cliente:', error)
            res.status(500).json({ error:'Error del servidor' })
        }
};

// Elimina un cliente con el ID proporcionado en los parámetros de la solicitud
export const deleteCliente = async (req, res) => {
    try{
    const eliminado = await clienteservice.deleteCliente(req.params.id);

    if (!eliminado) return res.status(404).json({ error: 'Cliente no encontrado' });
    
    res.status(201).json({ message: 'Cliente eliminado correctamente' });
    }catch(error){
        console.error('Error al eliminar Cliente:', error)
        res.status(500).json({ error:'Error del servidor' })
    }
};

