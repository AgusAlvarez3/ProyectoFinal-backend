const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');

// GET /categorias - Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// GET /categorias/:id - Obtener una categoría por su ID
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
});

// POST /categorias - Crear una nueva categoría
router.post('/', async (req, res) => {
  try {

    if(!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Debe enviar datos en el cuerpo de la solicitud.' });
    }

    const { nombre } = req.body;
    
    if(!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.'});
    }

    const nuevaCategoria = await Categoria.create({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch(error) {
    res.status(400).json({ error: 'Error al crear la categoría', detalles: error.message });
  }
});

// PUT /categorias/:id - Actualizar una categoría por su ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if(!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Debe enviar datos en el cuerpo de la solicitud.' });
    }
    
    const { nombre } = req.body;

    if(!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.'});
    }

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await categoria.update({ nombre });

    res.json({ mensaje: 'Categoría actualizada con éxito', categoria });

  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría', detalles: error.message });
  }
});

// DELETE /categorias/:id - Eliminar una categoría por su ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await categoria.destroy();

    res.json({ mensaje: 'Categoría eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría', detalles: error.message });
  }
});


module.exports = router;
