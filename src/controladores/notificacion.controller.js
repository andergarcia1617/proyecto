import { conmysql } from '../db.js';

export const getNotificaciones = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Notificacion');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
};

export const createNotificacion = async (req, res) => {
    const { usuario_id, mensaje } = req.body;
    try {
        const [rows] = await conmysql.query(
            'INSERT INTO Notificacion (usuario_id, mensaje) VALUES (?, ?)',
            [usuario_id, mensaje]
        );
        res.json({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear notificación' });
    }
};