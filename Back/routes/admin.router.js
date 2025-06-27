// Back/routes/admin.routes.js
import express from 'express';
import {
  getAllAdmins,
  getAdmin,
  postAdmin,
  putAdmin,
  deleteAdmin,
  loginAdmin
} from '../controllers/admin.controllers.js';


const router = express.Router();

router.get('/', getAllAdmins);

router.get('/:id', getAdmin);

router.post('/', postAdmin);

router.put('/:id', putAdmin);

router.delete('/:id', deleteAdmin);

<<<<<<< HEAD
router.post('login',(loginAdmin));
=======
router.get('login',(loginAdmin));
>>>>>>> cf04d2c8dacd4d7650d9c47a62b13c8b3d618346

export default router;
