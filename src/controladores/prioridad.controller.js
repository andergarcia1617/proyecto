import { conmysql } from '../db.js';

export const getPrioridades = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Prioridad');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener prioridades' });
    }
};

export const createPrioridad = async (req, res) => {
    const { name } = req.body;
    try {
        const [rows] = await conmysql.query(
            'INSERT INTO Prioridad (name) VALUES (?)',
            [name]
        );
        res.json({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear prioridad' });
    }
};
