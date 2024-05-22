const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod');

const tarefaSchema = z.object({
  titulo: z.string(),
  descricao: z.string().optional(),
  dataVencimento: z.string(), // Expecting ISO string for DateTime
  prioridade: z.enum(['Baixa', 'Média', 'Alta']),
  estado: z.enum(['Pendente', 'Em andamento', 'Concluída'])
});

const getTarefas = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const createTarefa = async (req, res) => {
  const result = tarefaSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  try {
    const tarefa = await prisma.tarefa.create({
      data: result.data,
    });
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

const updateTarefa = async (req, res) => {
  const { id } = req.params;
  const result = tarefaSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: result.data,
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
