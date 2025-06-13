//presistencia
import cliente from '../models/cliente.js'

const getAll =async ()=>{
    return await cliente.getClientes()
};

const getById = async (id) =>{
    return cliente.getClientesById(id)
}

const setClientes = (a) =>{
    return cliente.crearCliente(a.nombre)
}

const updateClientes = (id,nuevoNombre) =>{
    return cliente.actualizarClientes(id, nuevoNombre)
}

const deleteClientes = async (id) =>{
    return cliente.borrarClientes(id)
}


export default { getAll , getById, setClientes, updateClientes, deleteClientes };