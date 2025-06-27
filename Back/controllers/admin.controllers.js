// Back/controllers/admin.controller.js
import adminservice from '../service/admin.service.js';

export const getAllAdmins = async (req, res) => {o
    const admins = await adminservice.getAdmins();
    res.json(admins);
};

export const getAdmin = async (req, res) => {
    const admin = await adminservice.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin no encontrado' });
    res.json(admin);
};

export const postAdmin = async (req, res) => {
    const nuevo = await adminservice.createAdmin(req.body);
    res.status(201).json(nuevo);
};

export const putAdmin = async (req, res) => {
    const actualizado = await adminservice.updateAdmin(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: 'Admin no encontrado' });
    res.json(actualizado);
};

export const deleteAdmin = async (req, res) => {
    const eliminado = await adminservice.deleteAdmin(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Admin no encontrado' });
    res.json({ message: 'Admin eliminado correctamente' });
};


export const loginAdmin = async (req, res) => {
    const logeado = await adminservice.loginAdmin(req.body.email, req.body.password);
    if (!logeado) return res.status(401).json({ error: 'Credenciales incorrectas' });
    res.json({ message: 'Login exitoso', admin: logeado });
    
}   
