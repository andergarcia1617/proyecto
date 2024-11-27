import bcrypt from 'bcryptjs';  // Para encriptar la contraseña
import jwt from 'jsonwebtoken';  // Para generar el token JWT
import { conmysql } from '../db.js';

// Registrar un nuevo usuario
export const createUsuario = async (req, res) => {
    const { nombre_U, email, contrasena } = req.body;
    if (!nombre_U || !email || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        // Verificar si el correo ya está registrado
        const [existingUser] = await conmysql.query('SELECT * FROM Usuario WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar el nuevo usuario en la base de datos
        const [rows] = await conmysql.query(
            'INSERT INTO Usuario (nombre_U, email, contrasena) VALUES (?, ?, ?)',
            [nombre_U, email, hashedPassword]
        );
        
        res.status(201).json({ usuario_id: rows.insertId });
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        return res.status(500).json({ message: 'Error al crear usuario' });
    }
};

// Login de Usuario
export const loginUsuario = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        // Buscar al usuario por email
        const [user] = await conmysql.query('SELECT * FROM Usuario WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const validPassword = await bcrypt.compare(contrasena, user[0].contrasena);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Crear el token JWT con usuario_id incluido
        const token = jwt.sign(
            { usuario_id: user[0].usuario_id, email: user[0].email },
            process.env.JWT_SECRET,  // Usar la variable de entorno
            { expiresIn: '1h' }
        );

        res.json({ token, usuario_id: user[0].usuario_id });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
