import adminService from "../service/admin.service.js";
import authHelper from '../helpers/authHelper.js';
import LogAdmin from '../models/logAdmin.js';

const loginAdmin = async (req, res) => {
    
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    try {

        const admin= await adminService.findByEmail(email);

        if (!admin) {
            return res.status(404).json({ error: "Administrador no encontrado" });
        }
        
        const macht  = await authHelper.comparePassword(password, admin.contra);
        if( !macht) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.status(200).json({message: "Inicio de sesión exitoso", admin});
        console.log("se loge y crea la el log")
          // 🔹 Guardar log de login
        await LogAdmin.create({ adminId: admin.id });
    }
    
    catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }}

const logoutAdmin = async (req, res) => {
    try {
        res.status(200).json({ message: "Cierre de sesión exitoso" });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const getLogs = async (req, res) => {
    try {
    const logs = await LogAdmin.findAll({
        include: [{ model: Admin, attributes: ['id', 'nombre', 'email'] }],
        order: [['fecha', 'DESC']]

    });
    res.json(logs);
    console.log(logs)
    }
    catch (error) {
    console.error("Error al obtener logs:", error);
    res.status(500).json({ error: "Error al obtener logs" });
    }
};
export default {
    loginAdmin,
    logoutAdmin,
    getLogs
};