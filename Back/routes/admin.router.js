import {Router} from 'express';
import adminController from '../controllers/admin.controllers.js'

const admin = []

const router = Router()

router.get('/{:id}', adminController.getCombined)

router.post('/', adminController.createadmin)

export default router