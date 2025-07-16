import express from 'express';
import{
    crear,
    omitir,
    listar
}from '../controllers/encuesta.controllers.js';


const router = express.Router();



router.post('/', crear);
router.post('/omitida', omitir);
router.get('/', listar);



export default router;