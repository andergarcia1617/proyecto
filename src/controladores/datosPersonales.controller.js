import { conmysql } from '../db.js';

// Obtener todos los datos personales
export const getDatosPersonales = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Datos_Personales');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener datos personales' });
    }
};

// Obtener datos personales por ID
export const getDatosPersonalesById = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM Datos_Personales WHERE id_datos_personales = ?',
            [req.params.id]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: 'Datos personales no encontrados' });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener datos personales' });
    }
};

// Crear datos personales
export const createDatosPersonales = async (req, res) => {
    const { usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento } = req.body;
    try {
        const [rows] = await conmysql.query(
            'INSERT INTO Datos_Personales (usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento]
        );
        res.json({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear datos personales' });
    }
};

// Actualizar datos personales completamente
export const updateDatosPersonales = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento } = req.body;
    try {
        const [result] = await conmysql.query(
            'UPDATE Datos_Personales SET usuario_id = ?, nombre_completo = ?, direccion = ?, telefono = ?, fecha_nacimiento = ? WHERE id_datos_personales = ?',
            [usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento, id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Datos personales no encontrados' });
        }
        const [rows] = await conmysql.query(
            'SELECT * FROM Datos_Personales WHERE id_datos_personales = ?',
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar datos personales' });
    }
};

// Actualizar datos personales parcialmente
export const patchDatosPersonales = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento } = req.body;
    try {
        const [result] = await conmysql.query(
            `UPDATE Datos_Personales 
             SET 
                usuario_id = IFNULL(?, usuario_id), 
                nombre_completo = IFNULL(?, nombre_completo), 
                direccion = IFNULL(?, direccion), 
                telefono = IFNULL(?, telefono), 
                fecha_nacimiento = IFNULL(?, fecha_nacimiento)
             WHERE id_datos_personales = ?`,
            [usuario_id, nombre_completo, direccion, telefono, fecha_nacimiento, id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Datos personales no encontrados' });
        }
        const [rows] = await conmysql.query(
            'SELECT * FROM Datos_Personales WHERE id_datos_personales = ?',
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar datos personales' });
    }
};

// Eliminar datos personales
export const deleteDatosPersonales = async (req, res) => {
    try {
        const [rows] = await conmysql.query(
            'DELETE FROM Datos_Personales WHERE id_datos_personales = ?',
            [req.params.id]
        );
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: 'Datos personales no encontrados' });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar datos personales' });
    }
};
