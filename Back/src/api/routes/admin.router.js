// Back/routes/admin.routes.js
import express from 'express';
import {
  getAllAdmins,
  getAdmin,
  postAdmin,
  putAdmin,
  deleteAdmin,
  loginAdmin,
  mostrarAsistencias,

} from '../controllers/admin.controllers.js';

// Creacion de router
const router = express.Router();

router.get('/asistencia',  mostrarAsistencias);
// Ruta obtener todos los admins
router.get('/', getAllAdmins);

// Ruta obtener admin por ID
router.get('/:id', getAdmin);

// Ruta para crear un admin
router.post('/', postAdmin);

// Ruta para editar un admin
router.put('/:id', putAdmin);

// Ruta para eliminar un admin por ID
router.delete('/:id', deleteAdmin);

// Ruta para loguear admin





export default router;
