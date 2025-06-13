//presistencia
import neumatico from '../models/neumatico.js'

const getAll =async ()=>{
    return await neumatico.getneumaticos()
};

const getById = async (id) =>{
    return neumatico.getneumaticosByID(id)
}

const setneumatico = (a) =>{
    return neumatico.setneumaticos(a.name, a.email)
}

const updateneumaticos = (id, nombre, email) =>{
    return neumatico.updateneumaticos(id, nombre, email)
}

const deleteneumaticos = async (id) =>{
    return neumatico.deleteneumaticos(id)
}


export default { getAll , getById, setneumatico, updateneumaticos, deleteneumaticos };