import {Router} from 'express';
import adminController from '../controllers/admin.controllers.js'

const router = Router()

router.get('/{:id}', adminController.getCombined)

router.post('/', adminController.createadmin)
export default router