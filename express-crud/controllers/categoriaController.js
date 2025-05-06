const Categoria = require('../models/Categoria');

module.exports = {
  async criar(req, res) {
    const categoria = await Categoria.create(req.body);
    res.json(categoria);
  },
  async listar(req, res) {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  },
  async deletar(req, res) {
    const id = req.params.id;
    await Categoria.destroy({ where: { id } });
    res.json({ mensagem: 'Categoria deletada com sucesso' });
  }
};
