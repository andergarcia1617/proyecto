import { Router } from 'express';
import { getTareas, createTarea } from '../controladores/tarea.controller.js';

const router = Router();

router.get('/', getTareas);
router.post('/', createTarea);

export default router;
