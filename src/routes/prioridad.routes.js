import { Router } from 'express';
import { getPrioridades, createPrioridad } from '../controladores/prioridad.controller.js';

const router = Router();

router.get('/', getPrioridades);
router.post('/', createPrioridad);

export default router; 
