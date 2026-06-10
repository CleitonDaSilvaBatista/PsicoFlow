const prisma = require('../config/prisma');
const { receitaWhereForUser } = require('./scope');

function toNumber(value) {
  return Number(value || 0);
}

async function criarReceita(data) {
  return prisma.receita.create({
    data: {
      descricao: data.descricao,
      valor: data.valor,
      dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : new Date(),
      formaPagamento: data.formaPagamento,
      categoria: data.categoria || 'Sessão',
      status: data.status || 'PAGO',
      observacoes: data.observacoes,
      pacienteId: data.pacienteId ? Number(data.pacienteId) : null,
      sessaoId: data.sessaoId ? Number(data.sessaoId) : null
    },
    include: { paciente: true, sessao: true }
  });
}

async function listarReceitas(user) {
  return prisma.receita.findMany({
    where: receitaWhereForUser(user),
    orderBy: { dataPagamento: 'desc' },
    include: { paciente: true, sessao: true }
  });
}

async function buscarReceitaPorId(id) {
  return prisma.receita.findUnique({
    where: { id: Number(id) },
    include: { paciente: true, sessao: true }
  });
}

async function atualizarReceita(id, data) {
  return prisma.receita.update({
    where: { id: Number(id) },
    data: {
      descricao: data.descricao,
      valor: data.valor,
      dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : undefined,
      formaPagamento: data.formaPagamento,
      categoria: data.categoria,
      status: data.status,
      observacoes: data.observacoes,
      pacienteId: data.pacienteId ? Number(data.pacienteId) : undefined,
      sessaoId: data.sessaoId ? Number(data.sessaoId) : undefined
    },
    include: { paciente: true, sessao: true }
  });
}

async function deletarReceita(id) {
  return prisma.receita.delete({ where: { id: Number(id) } });
}

async function criarDespesa(data) {
  return prisma.despesa.create({
    data: {
      descricao: data.descricao,
      valor: data.valor,
      dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : new Date(),
      categoria: data.categoria,
      tipo: data.tipo || 'VARIAVEL',
      status: data.status || 'PAGO',
      observacoes: data.observacoes
    }
  });
}

async function listarDespesas() {
  return prisma.despesa.findMany({ orderBy: { dataPagamento: 'desc' } });
}

async function buscarDespesaPorId(id) {
  return prisma.despesa.findUnique({ where: { id: Number(id) } });
}

async function atualizarDespesa(id, data) {
  return prisma.despesa.update({
    where: { id: Number(id) },
    data: {
      descricao: data.descricao,
      valor: data.valor,
      dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : undefined,
      categoria: data.categoria,
      tipo: data.tipo,
      status: data.status,
      observacoes: data.observacoes
    }
  });
}

async function deletarDespesa(id) {
  return prisma.despesa.delete({ where: { id: Number(id) } });
}

async function resumo(user) {
  const [receitasPagas, receitasPendentes, despesasPagas, despesasPendentes, sessoesReceita] = await Promise.all([
    prisma.receita.aggregate({ where: { ...receitaWhereForUser(user), status: 'PAGO' }, _sum: { valor: true } }),
    prisma.receita.aggregate({ where: { ...receitaWhereForUser(user), status: 'PENDENTE' }, _sum: { valor: true } }),
    prisma.despesa.aggregate({ where: { status: 'PAGO' }, _sum: { valor: true } }),
    prisma.despesa.aggregate({ where: { status: 'PENDENTE' }, _sum: { valor: true } }),
    prisma.sessao.aggregate({ where: user?.role === 'PSICOLOGO' ? { psicologoId: user.id, status: { in: ['CONFIRMADA', 'REALIZADA'] } } : user?.role === 'PACIENTE' ? { paciente: { email: user.email }, status: { in: ['CONFIRMADA', 'REALIZADA'] } } : { status: { in: ['CONFIRMADA', 'REALIZADA'] } }, _sum: { valor: true } })
  ]);

  const totalReceitas = toNumber(receitasPagas._sum.valor);
  const totalReceitasPendentes = toNumber(receitasPendentes._sum.valor);
  const totalDespesas = toNumber(despesasPagas._sum.valor);
  const totalDespesasPendentes = toNumber(despesasPendentes._sum.valor);
  const receitaPrevistaSessoes = toNumber(sessoesReceita._sum.valor);

  return {
    totalReceitas,
    totalReceitasPendentes,
    totalDespesas,
    totalDespesasPendentes,
    receitaPrevistaSessoes,
    saldo: totalReceitas - totalDespesas,
    fluxoPrevisto: totalReceitas + totalReceitasPendentes + receitaPrevistaSessoes - totalDespesas - totalDespesasPendentes
  };
}

module.exports = {
  criarReceita,
  listarReceitas,
  buscarReceitaPorId,
  atualizarReceita,
  deletarReceita,
  criarDespesa,
  listarDespesas,
  buscarDespesaPorId,
  atualizarDespesa,
  deletarDespesa,
  resumo
};
