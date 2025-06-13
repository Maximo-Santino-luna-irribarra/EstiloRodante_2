import {Router} from 'express';
import adminController from '../controllers/admin.controllers.js'
import admin from '../models/admin.js';

const router = Router()

router.get('/{:id}', adminController.getCombined)

router.post('/', adminController.createAdmin)

router.put('/{:id}', adminController.updateAdmin)


export default router