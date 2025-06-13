//presistencia
import admin from '../models/admin.js'

const getAll =()=>{
    return admin.getAdmins()
};

const getById = (id) =>{
    return admin.getAdminsByID(id)
}

const setAdmin = ({name, email, contra}) =>{
    return admin.setAdmins(name, email, contra)
}


export default { getAll , getById, setAdmin};