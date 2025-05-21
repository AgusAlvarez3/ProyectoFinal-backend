const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'producto',
  timestamps: false
});

module.exports = Producto;
