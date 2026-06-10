const prisma = require('../config/prisma');
const { sessaoWhereForUser } = require('./scope');

const includeSessao = {
  paciente: true,
  psicologo: { select: { id: true, nome: true, email: true, role: true } },
  prontuario: true
};

async function criarSessao(data, user) {
  const psicologoId = user?.role === 'PSICOLOGO' ? user.id : (data.psicologoId ? Number(data.psicologoId) : null);
  return prisma.sessao.create({
    data: {
      pacienteId: Number(data.pacienteId),
      psicologoId,
      dataHora: new Date(data.dataHora),
      tipo: data.tipo,
      status: data.status || 'PENDENTE',
      valor: data.valor,
      observacoes: data.observacoes
    },
    include: includeSessao
  });
}

async function listarSessoes(user) {
  return prisma.sessao.findMany({
    where: sessaoWhereForUser(user),
    orderBy: { dataHora: 'asc' },
    include: includeSessao
  });
}

async function buscarSessaoPorId(id, user) {
  return prisma.sessao.findFirst({
    where: { id: Number(id), AND: [sessaoWhereForUser(user)] },
    include: includeSessao
  });
}

async function atualizarSessao(id, data, user) {
  const sessao = await buscarSessaoPorId(id, user);
  if (!sessao) throw new Error('Sessão não encontrada ou sem permissão.');
  return prisma.sessao.update({
    where: { id: Number(id) },
    data: {
      pacienteId: data.pacienteId ? Number(data.pacienteId) : undefined,
      psicologoId: data.psicologoId ? Number(data.psicologoId) : undefined,
      dataHora: data.dataHora ? new Date(data.dataHora) : undefined,
      tipo: data.tipo,
      status: data.status,
      valor: data.valor,
      observacoes: data.observacoes
    },
    include: includeSessao
  });
}

async function deletarSessao(id, user) {
  const sessao = await buscarSessaoPorId(id, user);
  if (!sessao) throw new Error('Sessão não encontrada ou sem permissão.');
  return prisma.sessao.delete({ where: { id: Number(id) } });
}

module.exports = { criarSessao, listarSessoes, buscarSessaoPorId, atualizarSessao, deletarSessao };
