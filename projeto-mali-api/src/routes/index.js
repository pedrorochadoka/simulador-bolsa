const express = require('express');
const apiRoutes = require('./api');

const router = express.Router();

// Adicionar rotas de API
router.use('/', apiRoutes);

router.get('/test', (req, res) => {
  res.json({ message: 'Rota de teste funcionando!' });
});

module.exports = router;
