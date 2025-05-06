const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware para processar JSON e dados de formulários
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados em memória
let categorias = [];
let produtos = [];

// Rota principal para servir o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para cadastrar categoria
app.post('/categorias', (req, res) => {
    const { nome } = req.body;
    if (nome) {
        categorias.push({ id: categorias.length + 1, nome });
        res.status(201).json({ message: 'Categoria cadastrada com sucesso!' });
    } else {
        res.status(400).json({ message: 'Nome da categoria é obrigatório!' });
    }
});

// Rota para listar categorias
app.get('/categorias/pesquisa', (req, res) => {
    res.status(200).json(categorias);
});

// Rota para cadastrar produto
app.post('/produtos', (req, res) => {
    const { nome, categoria } = req.body;
    if (nome && categoria) {
        produtos.push({ id: produtos.length + 1, nome, categoria });
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    } else {
        res.status(400).json({ message: 'Nome e categoria do produto são obrigatórios!' });
    }
});

// Rota para listar produtos
app.get('/produtos/pesquisa', (req, res) => {
    res.status(200).json(produtos);
});

// Rota para deletar produto
app.post('/produtos/deletar/:id', (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(produto => produto.id === parseInt(id));
    if (index !== -1) {
        produtos.splice(index, 1);
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } else {
        res.status(404).json({ message: 'Produto não encontrado!' });
    }
});

// Rota para editar produto
app.post('/produtos/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const produto = produtos.find(produto => produto.id === parseInt(id));
  if (produto) {
      produto.nome = nome;
      res.status(200).json({ message: 'Produto atualizado com sucesso!' });
  } else {
      res.status(404).json({ message: 'Produto não encontrado!' });
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});