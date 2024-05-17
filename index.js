const express = require('express');
const dotenv = require('dotenv');
const tarefaRoutes = require('./src/routes/tarefaRoutes');
const transacaoRoutes = require('./src/routes/transacaoRoutes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/tarefas', tarefaRoutes);
app.use('/transacoes', transacaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
