import authController from '../helpers/auth.controller.js';
import {Router} from 'express';

const router = Router();

router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);

export default router;