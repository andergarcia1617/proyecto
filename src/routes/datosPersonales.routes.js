import { Router } from 'express';
import {
    getDatosPersonales,
    getDatosPersonalesById,
    createDatosPersonales,
    updateDatosPersonales,
    patchDatosPersonales,
    deleteDatosPersonales
} from '../controladores/datosPersonales.controller.js';

const router = Router();

router.get('/', getDatosPersonales);
router.get('/:id', getDatosPersonalesById);
router.post('/', createDatosPersonales);
router.put('/:id', updateDatosPersonales);
router.patch('/:id', patchDatosPersonales);
router.delete('/:id', deleteDatosPersonales);

export default router;
