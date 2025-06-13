import {Router} from 'express';
import adminController from '../controllers/admin.controllers.js'


const router = Router()

router.get('/{:id}', adminController.getCombined)

router.post('/', adminController.createAdmin)

router.put('/{:id}', adminController.updateAdmin)

router.delete('/:id', adminController.deleteAdmin)

export default router
