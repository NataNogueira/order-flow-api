// Arquivo de entrada principal da aplicação

// Instanciamento 
const express = require('express');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());

// Pluga as rotas
app.use('/order', orderRoutes);

module.exports = app; // Exporta o app configurado