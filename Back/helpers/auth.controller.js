import adminService from "../service/admin.service.js";
import authHelper from '../helpers/authHelper.js';

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
    }
    
    catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }}

export default {
    loginAdmin
};