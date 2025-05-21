const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Categoria = require('../models/categoria'); 

// GET /productos - Obtener todos los productos incluyendo su categoría
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [{
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre']
      }]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Post /productos - Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
      const { nombre, descripcion, precio, stock, imagen_url, categoria_id } = req.body;
  
      // Validaciones manuales
      if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre del producto es obligatorio.' });
      }
  
      if (!precio || precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser mayor a 0.' });
      }
  
      if (stock < 0) {
        return res.status(400).json({ error: 'El stock no puede ser negativo.' });
      }
  
      if (!categoria_id) {
        return res.status(400).json({ error: 'Debe indicar una categoría válida.' });
      }
  
      // Crear producto si pasa las validaciones
      const nuevoProducto = await Producto.create({
        nombre,
        descripcion,
        precio,
        stock,
        imagen_url,
        categoria_id
      });
  
      res.status(201).json(nuevoProducto);
  
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el producto', detalles: error.message });
    }
  });
  

//Delete productos:id - eliminar un producto por su ID
router.delete('/:id', async (req, res) =>{
    try {
        const id= req.params.id;
        const eliminado = await Producto.destroy({where: { id } });
        if (eliminado) {
            res.json({ mensaje: 'Producto eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

//Put productos:id - actualizar un producto por su ID
router.put('/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock, imagen_url, categoria_id } = req.body;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    //Actualizacion de los campos
    await producto.update({
      nombre,
      descripcion,
      precio,
      stock,
      imagen_url,
      categoria_id
    });

    res.json({ mensaje: 'Producto actualizado con éxito', producto });
  
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', detalles: error.message});
  }
});

module.exports = router;