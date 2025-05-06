const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Categoria = require('./Categoria');

const Produto = sequelize.define('Produto', {
  nome: DataTypes.STRING,
  preco: DataTypes.FLOAT
});

Produto.belongsTo(Categoria);
Categoria.hasMany(Produto);

module.exports = Produto;
