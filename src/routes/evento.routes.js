import { Router } from 'express';
import {
    getEventos,
    getEventoById,
    createEvento,
    updateEvento,
    deleteEvento
} from '../controladores/evento.controller.js';

const router = Router();

router.get('/', getEventos);
router.get('/:id', getEventoById);
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);

export default router;
