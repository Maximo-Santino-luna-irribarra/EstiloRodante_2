import adminservice from '../service/admin.service.js';
import  authHelper from '../helpers/authHelper.js'
import {isValidString, isValidEmail} from '../helpers/validationHelper.js'


 // Obtiene todos los administradores
export const getAllAdmins = async (req, res) => {
   try{
    const admins = await adminservice.getAdmins();
    if (!admins || admins.length === 0) {
        return res.status(404).json({ error: 'No se encontraron administradores' });
    }

    res.status(200).json(admins);
  } catch (error){
    console.error('Error al obtener admins')
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtiene un administrador por su ID
export const getAdmin = async (req, res) => {
  try {
    const admin = await adminservice.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin no encontrado' });
    }
    res.status(200).json(admin); // explícitamente 200 OK
  } catch (error) {
    console.error('Error al obtener el admin:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


// Crea un nuevo administrador
export const postAdmin = async (req, res) => {
  try {
  const { nombre, email, contra } = req.body;

    isValidString(nombre)

    isValidEmail(email)

    isValidString(contra)

    const hashedPassword = await authHelper.hashPassword(contra);

    const nuevo = await adminservice.createAdmin({nombre, email, contra: hashedPassword});

    if (!nuevo) {
      return res.status(400).json({ error: 'Error al crear el admin' });
    }

    res.status(201).json(nuevo);

  } catch (error) {
    console.error('Error al crear admin:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
// Crea un nuevo administrador
export const putAdmin = async (req, res) => {
  try {
    const { nombre, email, contra } = req.body;
    const data = {};

    if (nombre !== undefined) {
      isValidString(nombre)
      data.nombre = nombre.trim();
    }

    if (email !== undefined) {
      isValidEmail(email)
      data.email = email;
    }

    if (contra !== undefined) {
      isValidString(contra)
      data.contra = await authHelper.hashPassword(contra);
    }

    const actualizado = await adminservice.updateAdmin(req.params.id, data);
    if (!actualizado) return res.status(404).json({ error: 'Admin no encontrado' });

    res.status(200).json(actualizado);

  } catch (error) {
    console.error('Error al actualizar admin:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


// Elimina un administrador por su ID
export const deleteAdmin = async (req, res) => {
  try{
    const eliminado = await adminservice.deleteAdmin(req.params.id);

    if (!eliminado) return res.status(404).json({ error: 'Admin no encontrado' });

    res.status(201).json({ message: 'Admin eliminado correctamente' });
  }catch(error){
    console.error('Error al eliminar el admin:', error)
    res.status(500).json({ error:'Error del servidor' })
  }
};

// Logea al admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email obligatorio y válido' });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Contraseña obligatoria' });
    }

    const logeado = await adminservice.loginAdmin(email, password);

    if (!logeado) return res.status(401).json({ error: 'Credenciales incorrectas' });

    res.status(200).json({ message: 'Login exitoso', admin: logeado });

  } catch (error) {
    console.error('Error al loguear admin:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

