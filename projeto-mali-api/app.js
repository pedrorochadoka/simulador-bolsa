const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('../projeto-mali-api/src/routes');

const app = express();
const PORT = 3000;

const allowedOrigins = [
  'https://pedrorochadoka.github.io', // Origem do seu frontend
];

// Middlewares globais
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origem (e.g., ferramentas locais como Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://pedrorochadoka.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


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
