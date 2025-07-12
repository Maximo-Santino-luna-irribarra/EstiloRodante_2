import express from 'express';
import { subirImagen } from '../controllers/upload.controller.js';
import { upload } from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/upload', upload.single('imagen'), subirImagen);

export default router;
