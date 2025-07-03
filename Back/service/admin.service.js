import Admin from '../models/admin.js';

// Obtener admins
const getAdmins = async () => await Admin.findAll();

// Obtener admin por ID
const getAdminById = async (id) => await Admin.findByPk(id);

// Crear admin
const createAdmin = async (data) => await Admin.create(data);

// Actualizar admin
const updateAdmin = async (id, data) => {
    const admin = await Admin.findByPk(id);

    if (!admin) return null;
        return await admin.update(data);
};

// Elimina admin
const deleteAdmin = async (id) => {
    const admin = await Admin.findByPk(id);
    if (!admin) return null;
        await admin.destroy();
        return true;
};

// Loguear admin
const loginAdmin = async (email, password) => {
    const admin = await Admin.findOne({ where: { email } });
}

// Obtener admin por email
const findByEmail = async (email) => {
    return await Admin.findOne({ where: { email } });
};

export default {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    findByEmail
};  
