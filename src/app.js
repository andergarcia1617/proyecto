import express from 'express'; // Asegúrate de importar express
import cors from 'cors';
import eventoRoutes from './routes/evento.routes.js';
import prioridadRoutes from './routes/prioridad.routes.js';
import tareaRoutes from './routes/tarea.routes.js';
import notificacionRoutes from './routes/notificacion.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import datosPersonalesRoutes from './routes/datosPersonales.routes.js';
import { PORT } from './config.js';

const app = express(); // Define express después de importarlo

// Configuración de CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/eventos', eventoRoutes);
app.use('/api/prioridades', prioridadRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/datosPersonales', datosPersonalesRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;