import adminService from "../service/admin.service";
import { comparePassword } from "./authHelper";
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
        const macht  = await comparePassword(password, admin.password);
    }
    
    catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }}