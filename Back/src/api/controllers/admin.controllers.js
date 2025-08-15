import adminservice from '../service/admin.service.js';
import authHelper from '../helpers/authHelper.js';
import LogAdmin from '../models/logAdmin.js';
import Encuesta from '../models/encuesta.js';
import { isValidString, isValidEmail } from '../helpers/validationHelper.js';
import { Op } from 'sequelize';
import { console } from 'inspector';


export const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminservice.getAdmins();
    if (!admins || admins.length === 0) {
      return res.status(404).json({ error: 'No se encontraron administradores' });
    }
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error al obtener admins:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await adminservice.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin no encontrado' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error al obtener el admin:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const postAdmin = async (req, res) => {
  try {
    const { nombre, email, contra } = req.body;

    isValidString(nombre);
    isValidEmail(email);
    isValidString(contra);

    const hashedPassword = await authHelper.hashPassword(contra);
    const nuevo = await adminservice.createAdmin({
      nombre,
      email,
      contra: hashedPassword
    });

    if (!nuevo) {
      return res.status(400).json({ error: 'Error al crear el admin' });
    }

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear admin:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


export const putAdmin = async (req, res) => {
  try {
    const { nombre, email, contra } = req.body;
    const data = {};

    if (nombre !== undefined) {
      isValidString(nombre);
      data.nombre = nombre.trim();
    }

    if (email !== undefined) {
      isValidEmail(email);
      data.email = email;
    }

    if (contra !== undefined) {
      isValidString(contra);
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

export const deleteAdmin = async (req, res) => {
  try {
    const eliminado = await adminservice.deleteAdmin(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Admin no encontrado' });

    res.status(201).json({ message: 'Admin eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el admin:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;
    // validacion
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email obligatorio y válido' });
    }
    // validacion
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Contraseña obligatoria' });
    }

    const logeado = await adminservice.loginAdmin(email, password);

    // validacion
    if (!logeado) return res.status(401).json({ error: 'Credenciales incorrectas' });

    console.log("efaujnowrfgen. j jn.zxm. czdx naedx cz")
    await LogAdmin.create({ adminId: logeado.id });

    res.status(200).json({ message: 'Login exitoso', admin: logeado });
  } catch (error) {

    console.error('Error al loguear admin:', error);

    res.status(500).json({ error: 'Error del servidor' });
  }
};


export async function mostrarAsistencias(req, res) {
  try {
    const { desde, hasta } = req.query || {};
    const where = {};

    if (desde || hasta) {
      where.createdAt = {
        [Op.and]: []
      };

      if (desde) {
        where.createdAt[Op.and].push({ [Op.gte]: new Date(desde) });
      }

      if (hasta) {
        where.createdAt[Op.and].push({ [Op.lte]: new Date(hasta) });
      }
    }

    const encuestas = await Encuesta.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    const total = encuestas.length;

    const promedioPuntaje = encuestas.reduce((acc, e) => acc + (e.puntuacion || 0), 0) / (total || 1);

    const porDia = {};
    encuestas.forEach(e => {
      const fecha = e.createdAt.toISOString().split('T')[0];
      porDia[fecha] = (porDia[fecha] || 0) + 1;
    });

    res.render('asistencia', {
      encuestas,
      total,
      promedioPuntaje: promedioPuntaje.toFixed(2),
      porDia,
      desde,
      hasta
    });
  } catch (error) {
    console.error('Error al mostrar asistencias:', error);
  }
}



export const getLogsAdmin = async (req, res) => {
  try {
    const logs = await LogAdmin.findAll({
      include: [{
        model: Admin,
        attributes: ['nombre', 'email']
      }],
      order: [['fecha', 'DESC']]
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error al obtener logs:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};