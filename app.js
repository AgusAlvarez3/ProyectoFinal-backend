const express = require('express');
const sequelize = require('./models');
require('dotenv').config();

const Producto = require('./models/producto');
const Categoria = require('./models/categoria');

// Relaciones (definidas una sola vez)
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const rutasUsuarios = require('./routes/usuarios');
const rutasProductos = require('./routes/producto');
const rutasCategorias = require('./routes/categoria');
app.use('/productos', rutasProductos);
app.use('/categorias', rutasCategorias);
app.use('/usuarios', rutasUsuarios);

app.get('/', (req, res) => {
  res.send('API de Tienda de Ropa funcionando 👗🚀');
});

const PORT = process.env.PORT || 3000;

// Aqui se comprueba que se conecte Sequelize con la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos ✅');

    // Sincroniza modelos con la DB
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos ✅');

    // Arranca el servidor una vez que está todo sincronizado
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar o sincronizar la base de datos ❌:', err);
  });
