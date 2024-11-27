import { conmysql } from '../db.js';

// Obtener todos los eventos
export const getEventos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Evento');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener eventos' });
    }
};

// Obtener un evento por ID
export const getEventoById = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM Evento WHERE evento_id = ?',
            [req.params.id]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener evento' });
    }
};

export const createEvento = async (req, res) => {
    const { usuario_id, tipo, titulo, descripcion, fecha_evento } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!usuario_id || !tipo || !titulo || !fecha_evento) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        const [rows] = await conmysql.query(
            'INSERT INTO Evento (usuario_id, tipo, titulo, descripcion, fecha_evento) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, tipo, titulo, descripcion || '', fecha_evento]
        );
        res.status(201).json({ id: rows.insertId });
    } catch (error) {
        console.error('Error al crear evento:', error.message);
        res.status(500).json({ message: 'Error al crear evento' });
    }
};


// Actualizar un evento completamente
export const updateEvento = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, tipo, titulo, descripcion, fecha_evento } = req.body;
    try {
        const [result] = await conmysql.query(
            'UPDATE Evento SET usuario_id = ?, tipo = ?, titulo = ?, descripcion = ?, fecha_evento = ? WHERE evento_id = ?',
            [usuario_id, tipo, titulo, descripcion, fecha_evento, id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        const [rows] = await conmysql.query('SELECT * FROM Evento WHERE evento_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar evento' });
    }
};

// Eliminar un evento
export const deleteEvento = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM Evento WHERE evento_id = ?', [
            req.params.id
        ]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar evento' });
    }
};
