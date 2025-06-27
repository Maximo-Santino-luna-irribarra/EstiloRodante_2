import Admin from '../models/admin.js';

const getAdmins = async () => await Admin.findAll();

const getAdminById = async (id) => await Admin.findByPk(id);

const createAdmin = async (data) => await Admin.create(data);






const updateAdmin = async (id, data) => {
    const admin = await Admin.findByPk(id);

    if (!admin) return null;
        return await admin.update(data);
};

const deleteAdmin = async (id) => {
    const admin = await Admin.findByPk(id);
    if (!admin) return null;
    await admin.destroy();
        return true;
};

const loginAdmin = async (email, password) => {
    const admin = await Admin.findOne({ where: { email } });
    
    

}



export default {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin
};  
