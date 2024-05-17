const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTransacoes = async (req, res) => {
  try {
    const transacoes = await prisma.transacao.findMany();
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
};

const createTransacao = async (req, res) => {
  const { descricao, categoria, valor, data } = req.body;
  try {
    const transacao = await prisma.transacao.create({
      data: { descricao, categoria, valor, data },
    });
    res.json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

const updateTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, categoria, valor, data } = req.body;
  try {
    const transacao = await prisma.transacao.update({
      where: { id: Number(id) },
      data: { descricao, categoria, valor, data },
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
