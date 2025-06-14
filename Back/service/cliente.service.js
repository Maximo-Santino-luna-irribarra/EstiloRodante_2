
import cliente from '../models/cliente.js'

const getAll =async ()=>{
    return await cliente.getClientes()
};

const getById = async (id) =>{
    return await cliente.getClientesById(id)
}

const setClientes = async  (a) =>{
    return cliente.crearCliente(a.nombre)
}

const updateClientes =  async (id,nuevoNombre) =>{
    return cliente.actualizarClientes(id, nuevoNombre)
}

const deleteClientes = async (id) =>{
    return cliente.borrarClientes(id)
}


export default { getAll , getById, setClientes, updateClientes, deleteClientes };