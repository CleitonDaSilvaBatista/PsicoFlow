const prisma = require('../config/prisma');

function safeUser(user) {
  return user ? { id: user.id, nome: user.nome, email: user.email, role: user.role } : null;
}

exports.listar = async (req, res) => {
  try {
    const [backups, usuarios, pacientes, sessoes, documentos, tarefas] = await Promise.all([
      prisma.backupRegistro.findMany({ orderBy: { createdAt: 'desc' }, take: 25 }).catch(() => []),
      prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, nome: true, email: true, role: true, createdAt: true, updatedAt: true } }).catch(() => []),
      prisma.paciente.findMany({ orderBy: { updatedAt: 'desc' }, take: 10, select: { id: true, nome: true, email: true, createdAt: true, updatedAt: true } }).catch(() => []),
      prisma.sessao.findMany({ orderBy: { updatedAt: 'desc' }, take: 10, include: { paciente: true, psicologo: { select: { id: true, nome: true, email: true, role: true } } } }).catch(() => []),
      prisma.documento.findMany({ orderBy: { updatedAt: 'desc' }, take: 10, include: { paciente: true, criadoPor: { select: { id: true, nome: true, email: true, role: true } } } }).catch(() => []),
      prisma.tarefa.findMany({ orderBy: { updatedAt: 'desc' }, take: 10, include: { paciente: true, responsavel: { select: { id: true, nome: true, email: true, role: true } } } }).catch(() => [])
    ]);

    const eventos = [];
    backups.forEach(b => eventos.push({ data: b.createdAt, usuario: b.criadoPor || 'Sistema', acao: b.tipo || 'EXPORTAÇÃO', modulo: 'Backup', detalhe: `${b.formato || 'JSON'} - ${b.status || 'GERADO'}` }));
    usuarios.forEach(u => eventos.push({ data: u.updatedAt || u.createdAt, usuario: u.nome, acao: 'Usuário cadastrado/atualizado', modulo: 'Usuários', detalhe: `${u.email} (${u.role})` }));
    pacientes.forEach(p => eventos.push({ data: p.updatedAt || p.createdAt, usuario: 'Equipe clínica', acao: 'Paciente cadastrado/atualizado', modulo: 'Pacientes', detalhe: p.nome }));
    sessoes.forEach(s => eventos.push({ data: s.updatedAt || s.createdAt, usuario: s.psicologo?.nome || 'Equipe clínica', acao: 'Sessão cadastrada/atualizada', modulo: 'Agenda', detalhe: `${s.paciente?.nome || 'Paciente'} - ${s.status}` }));
    documentos.forEach(d => eventos.push({ data: d.updatedAt || d.createdAt, usuario: d.criadoPor?.nome || 'Equipe clínica', acao: 'Documento cadastrado/atualizado', modulo: 'Documentos', detalhe: d.titulo }));
    tarefas.forEach(t => eventos.push({ data: t.updatedAt || t.createdAt, usuario: t.responsavel?.nome || 'Equipe clínica', acao: 'Tarefa cadastrada/atualizada', modulo: 'Tarefas', detalhe: t.titulo }));

    eventos.sort((a, b) => new Date(b.data) - new Date(a.data));
    res.json({ usuarioAtual: safeUser(req.user), total: eventos.length, eventos: eventos.slice(0, 50) });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro ao carregar auditoria.' });
  }
};
