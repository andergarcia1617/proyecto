import { Router } from 'express';
import {
    createUsuario, 
    loginUsuario, 
   
} from '../controladores/usuarios.controller.js';

const router = Router();

// Ruta para registro de usuario
router.post('/registro', createUsuario);  // Registrar usuario

// Ruta para login
router.post('/login', loginUsuario);      // Login de usuario

export default router;
