//presistencia
import {admin} from '../models/admin.js'
const admins = []

const getAll =()=>{
    return admins
};

const getById = (id) =>{
    return admins.find(admin => admin.id === id);
}

const create = ({name, email, contra}) =>{
    const newadmin = new admin(name, email, contra)
    admins.push(newadmin)
    return newadmin
}


export default { getAll , getById, create};