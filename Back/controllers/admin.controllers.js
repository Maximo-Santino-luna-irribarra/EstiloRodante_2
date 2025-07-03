// Back/controllers/admin.controller.js
import adminservice from '../service/admin.service.js';
import  authHelper from '../helpers/authHelper.js'

 // Obtiene todos los administradores
export const getAllAdmins = async (req, res) => {
   

    const admins = await adminservice.getAdmins();
    if (!admins || admins.length === 0) {
        return res.status(404).json({ error: 'No se encontraron administradores' });
    }

    res.json(admins);
};

// Obtiene un administrador por su ID
export const getAdmin = async (req, res) => {
    
    
    const admin = await adminservice.getAdminById(req.params.id);
    
    if (!admin) return res.status(404).json({ error: 'Admin no encontrado' });
    
    res.json(admin);
};

// Crea un nuevo administrador
export const postAdmin = async (req, res) => {
  

  const { nombre, email, contra } = req.body;

  if (!nombre || !email || !contra) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await authHelper.hashPassword(contra);

    const adminData = {
      nombre,
      email,
      contra: hashedPassword
    };

    const nuevo = await adminservice.createAdmin(adminData);

    if (!nuevo) {
      return res.status(400).json({ error: 'Error al crear el admin' });
    }

    res.status(201).json(nuevo);

  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
// Crea un nuevo administrador
export const putAdmin = async (req, res) => {
 
    const actualizado = await adminservice.updateAdmin(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: 'Admin no encontrado' });
    res.json(actualizado);
};

// Elimina un administrador por su ID
export const deleteAdmin = async (req, res) => {

    const eliminado = await adminservice.deleteAdmin(req.params.id);

    if (!eliminado) return res.status(404).json({ error: 'Admin no encontrado' });

    res.json({ message: 'Admin eliminado correctamente' });

};

// Logea al admin
export const loginAdmin = async (req, res) => {
    
    const logeado = await adminservice.loginAdmin(req.body.email, req.body.password);
    if (!logeado) return res.status(401).json({ error: 'Credenciales incorrectas' });
    res.json({ message: 'Login exitoso', admin: logeado });
    
}   
