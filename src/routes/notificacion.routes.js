import { Router } from 'express';
import { getNotificaciones, createNotificacion } from '../controladores/notificacion.controller.js';

const router = Router();

router.get('/', getNotificaciones);
router.post('/', createNotificacion);

export default router;
