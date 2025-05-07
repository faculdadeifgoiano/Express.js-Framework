const express = require('express');
const path = require('path');
const app = express();

// Configura o EJS como motor de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Supondo que o arquivo HTML esteja na pasta 'views'
app.get('/', (req, res) => {
    res.render('index', { produtos: produtosArray });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
