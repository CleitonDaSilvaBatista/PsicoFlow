const prisma = require('../config/prisma');

function num(v) { return Number(v || 0); }

async function financeiro() {
  const [receitas, despesas, sessoesRealizadas, sessoesTotais] = await Promise.all([
    prisma.receita.aggregate({ where: { status: 'PAGO' }, _sum: { valor: true }, _count: true }),
    prisma.despesa.aggregate({ where: { status: 'PAGO' }, _sum: { valor: true }, _count: true }),
    prisma.sessao.count({ where: { status: 'REALIZADA' } }),
    prisma.sessao.count()
  ]);

  const receitaTotal = num(receitas._sum.valor);
  const despesaTotal = num(despesas._sum.valor);
  return {
    receitaTotal,
    despesaTotal,
    saldo: receitaTotal - despesaTotal,
    quantidadeReceitas: receitas._count,
    quantidadeDespesas: despesas._count,
    sessoesRealizadas,
    sessoesTotais,
    ticketMedio: sessoesRealizadas ? receitaTotal / sessoesRealizadas : 0
  };
}

async function operacional() {
  const [pacientes, psicologos, sessoesPendentes, sessoesConfirmadas, sessoesRealizadas, sessoesCanceladas] = await Promise.all([
    prisma.paciente.count(),
    prisma.user.count({ where: { role: 'PSICOLOGO' } }),
    prisma.sessao.count({ where: { status: 'PENDENTE' } }),
    prisma.sessao.count({ where: { status: 'CONFIRMADA' } }),
    prisma.sessao.count({ where: { status: 'REALIZADA' } }),
    prisma.sessao.count({ where: { status: 'CANCELADA' } })
  ]);
  return { pacientes, psicologos, sessoesPendentes, sessoesConfirmadas, sessoesRealizadas, sessoesCanceladas };
}

async function clinico() {
  const [totalProntuarios, sessoesSemProntuario, pacientesComProntuario] = await Promise.all([
    prisma.prontuario.count(),
    prisma.sessao.count({ where: { prontuario: null } }),
    prisma.paciente.count({ where: { prontuarios: { some: {} } } })
  ]);
  return { totalProntuarios, sessoesSemProntuario, pacientesComProntuario };
}

async function completo() {
  const [relFinanceiro, relOperacional, relClinico] = await Promise.all([financeiro(), operacional(), clinico()]);
  return { financeiro: relFinanceiro, operacional: relOperacional, clinico: relClinico };
}

module.exports = { financeiro, operacional, clinico, completo };
