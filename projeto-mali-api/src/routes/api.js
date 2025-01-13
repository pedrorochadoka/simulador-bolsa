const express = require('express');
const accessoriesController = require('../controllers/accessoriesController');

const router = express.Router();

// Rota para listar bolsas pretas
router.get('/bolsas/preto', accessoriesController.listBagsByColor.bind(null, 'preto'));
router.get('/bolsas/azul', accessoriesController.listBagsByColor.bind(null, 'azul'));
router.get('/bolsas/branco', accessoriesController.listBagsByColor.bind(null, 'branco'));
router.get('/bolsas/cinza', accessoriesController.listBagsByColor.bind(null, 'cinza'));
router.get('/bolsas/rosa', accessoriesController.listBagsByColor.bind(null, 'rosa'));
router.get('/bolsas/verde', accessoriesController.listBagsByColor.bind(null, 'verde'));
router.get('/bolsas/all', accessoriesController.listBagsByColor.bind(null, 'all'));

module.exports = router;
