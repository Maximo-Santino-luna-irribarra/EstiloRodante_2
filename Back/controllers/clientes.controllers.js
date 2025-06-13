import { actualizarCliente } from '../models/cliente.js';



const createCliente = (req, res)=>{
    const cliente = req.body;
    const newCliente = adminService.crearCliente(cliente)
    return res.status(201).json(newCliente)
}

const getCombined = async (req, res) =>{
    const {id} = req.params
    if(!id){
        const admin = await adminService.getAll()
        return res.status(200).json(admin)
    }

    const adminFound = await adminService.getById(id)
    if(!adminFound){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(adminFound)
}

const updateCliente = async(req, res) =>{
    const {id} = req.params
    const {nuevoNombre} = req.body
    const updatedCliente = await adminService.actualizarCliente(id, nuevoNombre)
    if(!updatedCliente){
        return res.status(404).json({estado: "No Encontrado"})
    }
    return res.status(200).json(actualizarCliente)
}


const deleteAdmin = async(req, res) =>{
    const {id} = req.params
    const deletedAdmin = await adminService.deleteAdmins(id)
    if(!deletedAdmin){
        return res.status(404).json({estado: "No Encontrado o eliminado"})
    }
    return res.status(200).json(deleteAdmin)
}
export default { createCliente, getCombined, updateCliente, deleteAdmin };