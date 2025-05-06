
const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

module.exports = {
  async criar(req, res) {
    const produto = await Produto.create(req.body);
    res.json(produto);
  },
  async listar(req, res) {
    const produtos = await Produto.findAll({ include: Categoria });
    res.json(produtos);
  }
};
