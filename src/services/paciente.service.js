const prisma = require('../config/prisma');
const { pacienteWhereForUser } = require('./scope');

async function criarPaciente(data, userId) {
  return prisma.paciente.create({
    data: {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      telefone: data.telefone,
      dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : null,
      endereco: data.endereco,
      observacoes: data.observacoes,
      criadoPorId: userId
    }
  });
}

async function listarPacientes(user) {
  return prisma.paciente.findMany({
    where: pacienteWhereForUser(user),
    orderBy: { createdAt: 'desc' },
    include: {
      criadoPor: { select: { id: true, nome: true, email: true, role: true } },
      sessoes: { orderBy: { dataHora: 'desc' }, take: 1, include: { psicologo: { select: { id: true, nome: true, email: true, role: true } } } },
      planos: { where: { status: 'ATIVO' }, include: { plano: true }, take: 1 }
    }
  });
}

async function buscarPacientePorId(id, user) {
  return prisma.paciente.findFirst({
    where: { id: Number(id), AND: [pacienteWhereForUser(user)] },
    include: {
      criadoPor: { select: { id: true, nome: true, email: true, role: true } },
      sessoes: { orderBy: { dataHora: 'desc' }, include: { psicologo: { select: { id: true, nome: true, email: true, role: true } } } },
      prontuarios: { orderBy: { criadoEm: 'desc' } },
      planos: { include: { plano: true } },
      convenio: true
    }
  });
}

async function atualizarPaciente(id, data, user) {
  const paciente = await buscarPacientePorId(id, user);
  if (!paciente) throw new Error('Paciente não encontrado ou sem permissão.');
  return prisma.paciente.update({
    where: { id: Number(id) },
    data: {
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      telefone: data.telefone,
      dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : null,
      endereco: data.endereco,
      observacoes: data.observacoes
    }
  });
}

async function deletarPaciente(id, user) {
  const paciente = await buscarPacientePorId(id, user);
  if (!paciente) throw new Error('Paciente não encontrado ou sem permissão.');
  return prisma.paciente.delete({ where: { id: Number(id) } });
}

module.exports = { criarPaciente, listarPacientes, buscarPacientePorId, atualizarPaciente, deletarPaciente };
