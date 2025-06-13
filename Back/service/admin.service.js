//presistencia
import admin from '../models/admin.js'

const getAll =async ()=>{
    return await admin.getAdmins()
};

const getById = (id) =>{
    return admin.getAdminsByID(id)
}

const setAdmin = (a) =>{
    return admin.setAdmins(a.name, a.email)
}

const updateAdmins = (id, nombre, email) =>{
    return admin.updateAdmins(id, nombre, email)
}


export default { getAll , getById, setAdmin, updateAdmins};