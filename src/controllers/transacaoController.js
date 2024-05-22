const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod');

const transacaoSchema = z.object({
  descricao: z.string().optional(),
  categoria: z.string(),
  valor: z.number(),
  data: z.string(), // Expecting ISO string for DateTime
});

const getTransacoes = async (req, res) => {
  try {
    const transacoes = await prisma.transacao.findMany();
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
};

const createTransacao = async (req, res) => {
  const result = transacaoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  try {
    const transacao = await prisma.transacao.create({
      data: result.data,
    });
    res.json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

const updateTransacao = async (req, res) => {
  const { id } = req.params;
  const result = transacaoSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  try {
    const transacao = await prisma.transacao.update({
      where: { id: Number(id) },
      data: result.data,
    });
    res.json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
};

const deleteTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transacao.delete({ where: { id: Number(id) } });
    res.json({ message: 'Transação deletada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
};

module.exports = { getTransacoes, createTransacao, updateTransacao, deleteTransacao };
