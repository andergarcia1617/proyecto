import { conmysql } from '../db.js';


export const getTareas = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Tarea');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener tareas' });
    }
};

// Crear una nueva tarea
export const createTarea = async (req, res) => {
    const { usuario_id, evento_id, prioridad_id, titulo, descripcion, fecha_vencimiento, completado } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!usuario_id || !prioridad_id || !titulo || !fecha_vencimiento) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        const [rows] = await conmysql.query(
            'INSERT INTO Tarea (usuario_id, evento_id, prioridad_id, titulo, descripcion, fecha_vencimiento, completado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [usuario_id, evento_id, prioridad_id, titulo, descripcion || '', fecha_vencimiento, completado || 0]
        );
        res.status(201).json({ id: rows.insertId });
    } catch (error) {
        console.error('Error al crear tarea:', error.message);
        res.status(500).json({ message: 'Error al crear tarea' });
    }
};