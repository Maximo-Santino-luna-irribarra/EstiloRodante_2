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

router.get('login',(loginAdmin));

export default router;
