require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const pacienteRoutes = require('./routes/paciente.routes');
const sessaoRoutes = require('./routes/sessao.routes');
const prontuarioRoutes = require('./routes/prontuario.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const financeiroRoutes = require('./routes/financeiro.routes');
const relatorioRoutes = require('./routes/relatorio.routes');
const planoRoutes = require('./routes/plano.routes');
const convenioRoutes = require('./routes/convenio.routes');
const documentoRoutes = require('./routes/documento.routes');
const comunicacaoRoutes = require('./routes/comunicacao.routes');
const tarefaRoutes = require('./routes/tarefa.routes');
const espacoRoutes = require('./routes/espaco.routes');
const lembreteRoutes = require('./routes/lembrete.routes');
const backupRoutes = require('./routes/backup.routes');
const configuracaoRoutes = require('./routes/configuracao.routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(process.cwd()));

app.get('/api/health', (req, res) => {
  res.json({
    sistema: 'PsicoFlow',
    versao: '1.0.0',
    status: 'online',
    mensagem: 'API do PsicoFlow rodando com sucesso'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/sessoes', sessaoRoutes);
app.use('/api/prontuarios', prontuarioRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/planos', planoRoutes);
app.use('/api/convenios', convenioRoutes);
app.use('/api/documentos', documentoRoutes);
app.use('/api/comunicacao', comunicacaoRoutes);
app.use('/api/tarefas', tarefaRoutes);
app.use('/api/espacos', espacoRoutes);
app.use('/api/lembretes', lembreteRoutes);
app.use('/api/backup', backupRoutes);
app.use('/api/configuracoes', configuracaoRoutes);
module.exports = app;