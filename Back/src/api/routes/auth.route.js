import authController from '../controllers/auth.controller.js';
import {Router} from 'express';

const router = Router();

// Ruta para loguear
router.post('/login', authController.loginAdmin);

// Ruta para desloguear
router.post('/logout', authController.logoutAdmin);

router.get('/getLogs',authController.getLogs)


export default router;