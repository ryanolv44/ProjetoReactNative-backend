const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTarefas = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const createTarefa = async (req, res) => {
  const { titulo, descricao, dataVencimento, prioridade, estado } = req.body;
  try {
    const tarefa = await prisma.tarefa.create({
      data: { titulo, descricao, dataVencimento, prioridade, estado },
    });
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

const updateTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, dataVencimento, prioridade, estado } = req.body;
  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { titulo, descricao, dataVencimento, prioridade, estado },
    });
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

const deleteTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tarefa.delete({ where: { id: Number(id) } });
    res.json({ message: 'Tarefa deletada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};

module.exports = { getTarefas, createTarefa, updateTarefa, deleteTarefa };
