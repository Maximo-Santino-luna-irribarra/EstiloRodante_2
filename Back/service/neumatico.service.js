//presistencia
import neumatico from '../models/neumaticos.js'

const getAll =async ()=>{
    return await neumatico.getNeumaticos()
};

const getById = (id) =>{
    return neumatico.getNeumaticosByID(id)
}

const setNeumatico = async (a) =>{
    return await neumatico.setNeumaticos(a.nombre, a.marca, a.modelo, a.medida, a.indiceCarga, a.indiceVelocidad, a.tecnologia, a.precio, a.stock)
}

const updateNeumaticos = async (id, nombre, marca, modelo, medida, indiceCarga, indiceVelocidad, tecnologia, precio, stock) =>{
    return await neumatico.updateNeumaticos(id, nombre, marca, modelo, medida, indiceCarga, indiceVelocidad, tecnologia, precio, stock)
}

const deleteNeumatico = async (id) =>{
    return await neumatico.deleteNeumaticos(id)
}


export default { getAll , getById, setNeumatico, updateNeumaticos, deleteNeumatico };