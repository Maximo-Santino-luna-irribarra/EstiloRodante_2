//presistencia
import neumatico from '../models/neumaticos.js'

const getAll =async ()=>{
    return await neumatico.getNeumaticos()
};

const getById = (id) =>{
    return neumatico.getNeumaticosByID(id)
}

const setNeumatico = async (a) =>{
    return await neumatico.setNeumaticos(a.nombre, a.marca, a.modelo, a.medida, a.tecnologia, a.precio, a.stock)
}

const updateNeumaticos = async (id, nombre, marca, modelo, medida, tecnologia, precio, stock) =>{
    return await neumatico.updateNeumaticos(id, nombre, marca, modelo, medida, tecnologia, precio, stock)
}

const deleteNeumatico = async (id) =>{
    return await neumatico.deleteNeumaticos(id)
}


export default { getAll , getById, setNeumatico, updateNeumaticos, deleteNeumatico };