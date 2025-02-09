const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('../projeto-mali-api/src/routes');

const app = express();
const PORT = 3000;

const allowedOrigins = [
  'https://pedrorochadoka.github.io', // Frontend hospedado no GitHub Pages
  'http://18.117.138.102:3000'        // API local para testes
];

// Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origem (por exemplo, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));
// Servir imagens
app.use('/bolsas', express.static(path.join(__dirname, 'img/bolsas')));

// Usar rotas
app.use('/api', routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
