const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// POST /usuarios - Registrar nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, email, password, es_admin } = req.body;

    // Validaciones básicas
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios.' });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password,
      es_admin: es_admin || false
    });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });

  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', detalles: error.message });
  }
});

// POST /login - Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Validar contraseña
    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Login exitoso
    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        es_admin: usuario.es_admin
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al intentar iniciar sesión', detalles: error.message });
  }
});


module.exports = router;
