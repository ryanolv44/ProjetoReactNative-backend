const express = require('express');
const { getTransacoes, createTransacao, updateTransacao, deleteTransacao } = require('../controllers/transacaoController');
const router = express.Router();

router.get('/', getTransacoes);
router.post('/', createTransacao);
router.put('/:id', updateTransacao);
router.delete('/:id', deleteTransacao);

module.exports = router;
