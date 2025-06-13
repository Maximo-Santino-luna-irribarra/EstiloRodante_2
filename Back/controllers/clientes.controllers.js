import { actualizarCliente } from '../models/cliente.js';
import clienteService from '../service/cliente.service.js';



const createCliente = (req, res)=>{
    const cliente = req.body;
    const newCliente = clienteService.setClientes(cliente)
    return res.status(201).json(newCliente)
}

const getCombined = async (req, res) =>{
    const {id} = req.params
    if(!id){
        const cliente = await clienteService.getAll()
        return res.status(200).json(cliente)
    }

    const clienteFound = await clienteService.getById(id)
    if(!clienteFound){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(clienteFound)
}

const updateCliente = async(req, res) =>{
    const {id} = req.params
    const {nuevoNombre} = req.body
    const updatedCliente = await adminService.updateCliente(id, nuevoNombre)
    if(!updatedCliente){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(actualizarCliente)
}


const deleteCliente = async(req, res) =>{
    const {id} = req.params
    const deleteCliente = await clienteService.deleteClientes(id)
    if(!deleteCliente){
        return res.status(404).json({estado: "No Encontrado o eliminado"})
    }
    return res.status(200).json(deleteCliente)
}
export default { createCliente, getCombined, updateCliente, deleteCliente };