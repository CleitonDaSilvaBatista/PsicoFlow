const prisma = require('../config/prisma');
const { pacienteWhereForUser, sessaoWhereForUser, prontuarioWhereForUser, receitaWhereForUser } = require('./scope');

function num(v) { return Number(v || 0); }

async function resumoDashboard(user) {
  const pacienteWhere = pacienteWhereForUser(user);
  const sessaoWhere = sessaoWhereForUser(user);
  const prontuarioWhere = prontuarioWhereForUser(user);
  const receitaWhere = receitaWhereForUser(user);

  const [
    totalPacientes,
    totalPsicologos,
    totalSessoes,
    sessoesConfirmadas,
    sessoesRealizadas,
    sessoesCanceladas,
    totalProntuarios,
    receitasPagas,
    despesasPagas,
    receitaPrevistaSessoes,
    sessoesSemProntuario
  ] = await Promise.all([
    prisma.paciente.count({ where: pacienteWhere }),
    prisma.user.count({ where: { role: 'PSICOLOGO', ativo: true } }),
    prisma.sessao.count({ where: sessaoWhere }),
    prisma.sessao.count({ where: { ...sessaoWhere, status: 'CONFIRMADA' } }),
    prisma.sessao.count({ where: { ...sessaoWhere, status: 'REALIZADA' } }),
    prisma.sessao.count({ where: { ...sessaoWhere, status: 'CANCELADA' } }),
    prisma.prontuario.count({ where: prontuarioWhere }),
    prisma.receita.aggregate({ where: { ...receitaWhere, status: 'PAGO' }, _sum: { valor: true } }),
    user?.role === 'PACIENTE' ? Promise.resolve({ _sum: { valor: 0 } }) : prisma.despesa.aggregate({ where: { status: 'PAGO' }, _sum: { valor: true } }),
    prisma.sessao.aggregate({ where: { ...sessaoWhere, status: { in: ['CONFIRMADA', 'REALIZADA'] } }, _sum: { valor: true } }),
    prisma.sessao.count({ where: { ...sessaoWhere, prontuario: null } })
  ]);

  const totalReceitas = num(receitasPagas._sum.valor);
  const totalDespesas = num(despesasPagas._sum.valor);
  const receitaPrevista = num(receitaPrevistaSessoes._sum.valor);

  return {
    usuario: user,
    totalPacientes,
    totalPsicologos: user?.role === 'ADMIN' ? totalPsicologos : undefined,
    totalSessoes,
    sessoesHoje: totalSessoes,
    sessoesConfirmadas,
    sessoesRealizadas,
    sessoesCanceladas,
    totalProntuarios,
    sessoesSemProntuario,
    totalReceitas,
    receitaTotal: totalReceitas,
    totalDespesas,
    saldoFinanceiro: totalReceitas - totalDespesas,
    receitaPrevista,
    ticketMedio: sessoesRealizadas ? totalReceitas / sessoesRealizadas : 0
  };
}

module.exports = { resumoDashboard };
