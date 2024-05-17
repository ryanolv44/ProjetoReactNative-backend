const express = require('express');
const { getTarefas, createTarefa, updateTarefa, deleteTarefa } = require('../controllers/tarefaController');
const router = express.Router();

router.get('/', getTarefas);
router.post('/', createTarefa);
router.put('/:id', updateTarefa);
router.delete('/:id', deleteTarefa);

module.exports = router;
