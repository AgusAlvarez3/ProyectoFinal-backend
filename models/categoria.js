const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categoria',
  timestamps: false
});

module.exports = Categoria;
