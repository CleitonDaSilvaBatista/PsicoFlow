const prisma = require('../config/prisma');
const { prontuarioWhereForUser } = require('./scope');

const includeProntuario = { paciente: true, sessao: { include: { psicologo: { select: { id: true, nome: true, email: true, role: true } } } } };

async function criarProntuario(data) {
  return prisma.prontuario.create({
    data: {
      pacienteId: Number(data.pacienteId),
      sessaoId: data.sessaoId ? Number(data.sessaoId) : null,
      anamnese: data.anamnese,
      evolucao: data.evolucao,
      observacoes: data.observacoes
    },
    include: includeProntuario
  });
}

async function listarProntuarios(user) {
  return prisma.prontuario.findMany({ where: prontuarioWhereForUser(user), orderBy: { criadoEm: 'desc' }, include: includeProntuario });
}

async function buscarProntuarioPorId(id, user) {
  return prisma.prontuario.findFirst({ where: { id: Number(id), AND: [prontuarioWhereForUser(user)] }, include: includeProntuario });
}

async function atualizarProntuario(id, data, user) {
  const prontuario = await buscarProntuarioPorId(id, user);
  if (!prontuario) throw new Error('Prontuário não encontrado ou sem permissão.');
  return prisma.prontuario.update({ where: { id: Number(id) }, data: { anamnese: data.anamnese, evolucao: data.evolucao, observacoes: data.observacoes }, include: includeProntuario });
}

async function deletarProntuario(id, user) {
  const prontuario = await buscarProntuarioPorId(id, user);
  if (!prontuario) throw new Error('Prontuário não encontrado ou sem permissão.');
  return prisma.prontuario.delete({ where: { id: Number(id) } });
}

module.exports = { criarProntuario, listarProntuarios, buscarProntuarioPorId, atualizarProntuario, deletarProntuario };
