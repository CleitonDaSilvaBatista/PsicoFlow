const prisma = require('../config/prisma');

async function criarPlano(data) {
  return prisma.plano.create({
    data: {
      nome: data.nome,
      quantidadeSessoes: Number(data.quantidadeSessoes),
      valor: data.valor,
      descontoPercentual: data.descontoPercentual ? Number(data.descontoPercentual) : 0,
      descricao: data.descricao,
      ativo: data.ativo !== undefined ? Boolean(data.ativo) : true
    }
  });
}

async function listarPlanos() {
  return prisma.plano.findMany({ orderBy: { createdAt: 'desc' } });
}

async function buscarPlanoPorId(id) {
  return prisma.plano.findUnique({
    where: { id: Number(id) },
    include: { pacientes: { include: { paciente: true } } }
  });
}

async function atualizarPlano(id, data) {
  return prisma.plano.update({
    where: { id: Number(id) },
    data: {
      nome: data.nome,
      quantidadeSessoes: data.quantidadeSessoes ? Number(data.quantidadeSessoes) : undefined,
      valor: data.valor,
      descontoPercentual: data.descontoPercentual !== undefined ? Number(data.descontoPercentual) : undefined,
      descricao: data.descricao,
      ativo: data.ativo
    }
  });
}

async function deletarPlano(id) {
  return prisma.plano.delete({ where: { id: Number(id) } });
}

async function atribuirPlanoAoPaciente(data) {
  const plano = await prisma.plano.findUnique({ where: { id: Number(data.planoId) } });
  if (!plano) throw new Error('Plano não encontrado.');

  return prisma.planoPaciente.create({
    data: {
      pacienteId: Number(data.pacienteId),
      planoId: Number(data.planoId),
      sessoesContratadas: data.sessoesContratadas ? Number(data.sessoesContratadas) : plano.quantidadeSessoes,
      sessoesUtilizadas: data.sessoesUtilizadas ? Number(data.sessoesUtilizadas) : 0,
      dataInicio: data.dataInicio ? new Date(data.dataInicio) : new Date(),
      dataFim: data.dataFim ? new Date(data.dataFim) : null,
      observacoes: data.observacoes
    },
    include: { paciente: true, plano: true }
  });
}

async function consumirSessaoPlano(id) {
  const planoPaciente = await prisma.planoPaciente.findUnique({ where: { id: Number(id) } });
  if (!planoPaciente) throw new Error('Plano do paciente não encontrado.');
  if (planoPaciente.sessoesUtilizadas >= planoPaciente.sessoesContratadas) {
    throw new Error('Paciente não possui saldo de sessões neste plano.');
  }

  return prisma.planoPaciente.update({
    where: { id: Number(id) },
    data: { sessoesUtilizadas: planoPaciente.sessoesUtilizadas + 1 },
    include: { paciente: true, plano: true }
  });
}

async function listarPlanosPacientes() {
  const registros = await prisma.planoPaciente.findMany({
    orderBy: { createdAt: 'desc' },
    include: { paciente: true, plano: true }
  });

  return registros.map((item) => ({
    ...item,
    sessoesRestantes: item.sessoesContratadas - item.sessoesUtilizadas
  }));
}

module.exports = {
  criarPlano,
  listarPlanos,
  buscarPlanoPorId,
  atualizarPlano,
  deletarPlano,
  atribuirPlanoAoPaciente,
  consumirSessaoPlano,
  listarPlanosPacientes
};
