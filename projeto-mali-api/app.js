const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('../projeto-mali-api/src/routes');

const app = express();
const PORT = 3000;

// Middlewares globais
app.use(cors());
// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));
// Servir imagens
app.use('/bolsas', express.static(path.join(__dirname, 'img/bolsas')));

// Usar rotas
app.use('/api', routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} ou https://simulador-bolsa.onrender.com/`);
});
