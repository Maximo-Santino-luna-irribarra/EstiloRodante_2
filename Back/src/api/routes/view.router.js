// Back/routes/view.routes.js
import { Router } from 'express';
import {
  renderLogin,
  renderDashboard,
  renderEditar,
  renderAgregar,
  renderVentas,
  renderClientes,
  renderAsistencias
} from '../controllers/view.controller.js';

const router = Router();

router.get('/', renderLogin);
router.get('/login', renderLogin);
router.get('/dashboard', renderDashboard);
router.get('/editar/:id', renderEditar);
router.get('/agregar', renderAgregar);
router.get('/vista_ventas', renderVentas);
router.get('/vista_clientes', renderClientes);
router.get('/asistencia', renderAsistencias)
export default router;
