//presistencia
import admin from '../models/admin.js'

const getAll =async ()=>{
    return await admin.getAdmins()
};

const getById = async (id) =>{
    return admin.getAdminsByID(id)
}

const setAdmin = (a) =>{
    return admin.setAdmins(a.name, a.email)
}

const updateAdmins = (id, nombre, email) =>{
    return admin.updateAdmins(id, nombre, email)
}

const deleteAdmins = async (id) =>{
    return admin.deleteAdmins(id)
}


export default { getAll , getById, setAdmin, updateAdmins, deleteAdmins };