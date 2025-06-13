//presistencia
import neumatico from '../models/neumaticos.js'

const getAll =async ()=>{
    return await neumatico.getNeumaticos()
};

const getById = async (id) =>{
    return neumatico.getNeumaticosByID(id)
}

const setneumatico = (a) =>{
    return neumatico.setNeumaticos(a.nombre, a.email)
}

const updateneumaticos = (id, nombre, email) =>{
    return neumatico.updateneumaticos(id, nombre, email)
}

const deleteneumaticos = async (id) =>{
    return neumatico.deleteneumaticos(id)
}


export default { getAll , getById, setneumatico, updateneumaticos, deleteneumaticos };