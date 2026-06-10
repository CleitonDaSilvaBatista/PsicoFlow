
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function upsertUser({ nome, email, senha, role }) {
  const senhaHash = await bcrypt.hash(senha, 10);
  return prisma.user.upsert({
    where: { email },
    update: { nome, role, ativo: true },
    create: { nome, email, senha: senhaHash, role, ativo: true }
  });
}

async function main() {
  console.log('🌱 Criando dados de demonstração do PsicoFlow...');

  const admin = await upsertUser({
    nome: 'Cleiton Admin',
    email: 'admin@psicoflow.com.br',
    senha: '123456',
    role: 'ADMIN'
  });

  const psicologa = await upsertUser({
    nome: 'Profissional Clínica',
    email: 'profissional@psicoflow.com.br',
    senha: '123456',
    role: 'PSICOLOGO'
  });

  await upsertUser({
    nome: 'Paciente Cleiton',
    email: 'paciente@psicoflow.com.br',
    senha: '123456',
    role: 'PACIENTE'
  });

  const convenios = [];
  for (const c of [
    { nome: 'Unimed', percentualCobertura: 70, percentualPaciente: 30, diaRepasse: 10, observacoes: 'Repasse mensal.' },
    { nome: 'Bradesco Saúde', percentualCobertura: 80, percentualPaciente: 20, diaRepasse: 15, observacoes: 'Coparticipação reduzida.' },
    { nome: 'Particular', percentualCobertura: 0, percentualPaciente: 100, diaRepasse: null, observacoes: 'Pagamento direto pelo paciente.' }
  ]) {
    convenios.push(await prisma.convenio.upsert({
      where: { nome: c.nome },
      update: c,
      create: c
    }));
  }

  const planos = [];
  for (const p of [
    { nome: 'Plano Essencial', quantidadeSessoes: 4, valor: 520, descontoPercentual: 5, descricao: 'Pacote mensal com 4 sessões.' },
    { nome: 'Plano Terapêutico', quantidadeSessoes: 8, valor: 960, descontoPercentual: 10, descricao: 'Acompanhamento quinzenal/intensivo.' },
    { nome: 'Plano Premium', quantidadeSessoes: 12, valor: 1320, descontoPercentual: 15, descricao: 'Pacote completo com prioridade de agenda.' }
  ]) {
    planos.push(await prisma.plano.upsert({
      where: { id: planos.length + 1 },
      update: p,
      create: p
    }).catch(async () => prisma.plano.create({ data: p })));
  }

  const pacientesData = [
    {
      nome: 'Paciente Cleiton',
      cpf: '12345678900',
      email: 'paciente@psicoflow.com.br',
      telefone: '71999999999',
      dataNascimento: new Date('2000-05-10'),
      endereco: 'Salvador - BA',
      observacoes: 'Paciente em acompanhamento inicial.',
      convenioId: convenios[0].id
    },
    {
      nome: 'Paciente Terapêutico',
      cpf: '98765432100',
      email: 'paciente.terapeutico@psicoflow.com.br',
      telefone: '71988888888',
      dataNascimento: new Date('1998-08-15'),
      endereco: 'Salvador - BA',
      observacoes: 'Paciente com plano terapêutico ativo.',
      convenioId: convenios[1].id
    },
    {
      nome: 'Paciente Plano',
      cpf: '45678912300',
      email: 'paciente.plano@psicoflow.com.br',
      telefone: '71977777777',
      dataNascimento: new Date('1992-03-22'),
      endereco: 'Lauro de Freitas - BA',
      observacoes: 'Paciente particular.',
      convenioId: convenios[2].id
    }
  ];

  const pacientes = [];
  for (const p of pacientesData) {
    pacientes.push(await prisma.paciente.upsert({
      where: { cpf: p.cpf },
      update: p,
      create: { ...p, criadoPorId: admin.id }
    }));
  }

  // Atribuir planos, evitando duplicar em rodadas repetidas
  for (let i = 0; i < pacientes.length; i++) {
    const existente = await prisma.planoPaciente.findFirst({
      where: { pacienteId: pacientes[i].id, planoId: planos[i].id }
    });
    if (!existente) {
      await prisma.planoPaciente.create({
        data: {
          pacienteId: pacientes[i].id,
          planoId: planos[i].id,
          sessoesContratadas: planos[i].quantidadeSessoes,
          sessoesUtilizadas: i,
          observacoes: 'Plano criado automaticamente pelo seed.'
        }
      });
    }
  }

  const sessoesData = [
    {
      pacienteId: pacientes[0].id,
      psicologoId: psicologa.id,
      dataHora: new Date('2026-06-15T14:00:00.000Z'),
      tipo: 'Terapia Individual',
      status: 'CONFIRMADA',
      valor: 150,
      observacoes: 'Primeira sessão agendada.'
    },
    {
      pacienteId: pacientes[1].id,
      psicologoId: psicologa.id,
      dataHora: new Date('2026-06-16T10:00:00.000Z'),
      tipo: 'Terapia Individual',
      status: 'REALIZADA',
      valor: 160,
      observacoes: 'Sessão realizada com foco em rotina e ansiedade.'
    },
    {
      pacienteId: pacientes[2].id,
      psicologoId: psicologa.id,
      dataHora: new Date('2026-06-17T16:30:00.000Z'),
      tipo: 'Avaliação Psicológica',
      status: 'PENDENTE',
      valor: 220,
      observacoes: 'Avaliação inicial pendente.'
    }
  ];

  const sessoes = [];
  for (const s of sessoesData) {
    const existente = await prisma.sessao.findFirst({
      where: { pacienteId: s.pacienteId, dataHora: s.dataHora }
    });
    sessoes.push(existente || await prisma.sessao.create({ data: s }));
  }

  const prontuariosData = [
    {
      pacienteId: pacientes[0].id,
      sessaoId: sessoes[0].id,
      anamnese: 'Paciente relata ansiedade recorrente e dificuldade para dormir.',
      evolucao: 'Foram trabalhadas estratégias iniciais de respiração e identificação de pensamentos automáticos.',
      observacoes: 'Manter acompanhamento semanal.'
    },
    {
      pacienteId: pacientes[1].id,
      sessaoId: sessoes[1].id,
      anamnese: 'Paciente relata sobrecarga profissional e dificuldade de organização.',
      evolucao: 'Sessão focada em planejamento de rotina, autocuidado e técnicas de enfrentamento.',
      observacoes: 'Revisar tarefas na próxima sessão.'
    },
    {
      pacienteId: pacientes[2].id,
      sessaoId: null,
      anamnese: 'Paciente em triagem inicial para avaliação psicológica.',
      evolucao: 'Coleta de informações iniciais e orientação sobre o processo terapêutico.',
      observacoes: 'Agendar continuação da avaliação.'
    }
  ];

  for (const p of prontuariosData) {
    const existente = p.sessaoId ? await prisma.prontuario.findUnique({ where: { sessaoId: p.sessaoId } }) : null;
    if (!existente) {
      await prisma.prontuario.create({ data: p });
    }
  }

  for (const r of [
    { descricao: 'Pagamento sessão Paciente Cleiton', valor: 150, formaPagamento: 'Pix', categoria: 'Sessão', status: 'PAGO', pacienteId: pacientes[0].id, sessaoId: sessoes[0].id },
    { descricao: 'Pagamento sessão Paciente Terapêutico', valor: 160, formaPagamento: 'Cartão', categoria: 'Sessão', status: 'PAGO', pacienteId: pacientes[1].id, sessaoId: sessoes[1].id },
    { descricao: 'Pacote Plano Premium Paciente Plano', valor: 1320, formaPagamento: 'Pix', categoria: 'Plano', status: 'PAGO', pacienteId: pacientes[2].id }
  ]) {
    const existente = await prisma.receita.findFirst({ where: { descricao: r.descricao } });
    if (!existente) await prisma.receita.create({ data: r });
  }

  for (const d of [
    { descricao: 'Aluguel da clínica', valor: 1800, categoria: 'Estrutura', tipo: 'FIXA', status: 'PAGO' },
    { descricao: 'Internet e sistemas', valor: 250, categoria: 'Tecnologia', tipo: 'FIXA', status: 'PAGO' },
    { descricao: 'Materiais administrativos', valor: 180, categoria: 'Operacional', tipo: 'VARIAVEL', status: 'PAGO' }
  ]) {
    const existente = await prisma.despesa.findFirst({ where: { descricao: d.descricao } });
    if (!existente) await prisma.despesa.create({ data: d });
  }



  await prisma.configuracaoClinica.upsert({
    where: { id: 1 },
    update: { nome: 'Clínica PsicoFlow', email: 'contato@psicoflow.com.br', telefone: '71999990000', endereco: 'Salvador - BA' },
    create: { id: 1, nome: 'Clínica PsicoFlow', email: 'contato@psicoflow.com.br', telefone: '71999990000', endereco: 'Salvador - BA' }
  });

  const espaco = await prisma.espaco.upsert({
    where: { nome: 'Sala 1' },
    update: { descricao: 'Sala de atendimento individual', capacidade: 2, recursos: 'Poltronas, mesa, ar-condicionado', status: 'ATIVO' },
    create: { nome: 'Sala 1', descricao: 'Sala de atendimento individual', capacidade: 2, recursos: 'Poltronas, mesa, ar-condicionado', status: 'ATIVO' }
  });

  const reservaExistente = await prisma.reservaEspaco.findFirst({ where: { sessaoId: sessoes[0].id } });
  if (!reservaExistente) {
    const inicio = sessoes[0].dataHora;
    const fim = new Date(inicio.getTime() + 50 * 60000);
    await prisma.reservaEspaco.create({ data: { espacoId: espaco.id, sessaoId: sessoes[0].id, inicio, fim, observacoes: 'Reserva criada pelo seed.' } });
  }

  for (const doc of [
    { titulo: 'Contrato terapêutico', tipo: 'CONTRATO', pacienteId: pacientes[0].id, conteudo: 'Contrato vinculado ao paciente e gerado pelo sistema.' },
    { titulo: 'Laudo psicológico', tipo: 'LAUDO', pacienteId: pacientes[1].id, conteudo: 'Laudo vinculado ao paciente e armazenado no banco.' },
    { titulo: 'Recibo de pagamento', tipo: 'RECIBO', pacienteId: pacientes[0].id, sessaoId: sessoes[0].id, conteudo: 'Recibo gerado a partir da sessão paga.' }
  ]) {
    const existe = await prisma.documento.findFirst({ where: { titulo: doc.titulo, pacienteId: doc.pacienteId } });
    if (!existe) await prisma.documento.create({ data: { ...doc, criadoPorId: admin.id, tamanhoKb: 1 } });
  }

  for (const t of [
    { titulo: 'Responder formulário inicial', descricao: 'Paciente deve responder antes da próxima sessão.', pacienteId: pacientes[0].id, responsavelId: psicologa.id, prioridade: 'ALTA' },
    { titulo: 'Revisar prontuário pendente', descricao: 'Conferir evolução clínica da sessão.', pacienteId: pacientes[1].id, responsavelId: psicologa.id, prioridade: 'MEDIA' }
  ]) {
    const existe = await prisma.tarefa.findFirst({ where: { titulo: t.titulo, pacienteId: t.pacienteId } });
    if (!existe) await prisma.tarefa.create({ data: t });
  }

  for (const l of [
    { titulo: 'Lembrete de sessão', mensagem: 'Você possui sessão agendada amanhã.', pacienteId: pacientes[0].id, sessaoId: sessoes[0].id, enviarEm: new Date(Date.now() + 24 * 60 * 60 * 1000) }
  ]) {
    const existe = await prisma.lembrete.findFirst({ where: { sessaoId: l.sessaoId } });
    if (!existe) await prisma.lembrete.create({ data: l });
  }

  const msgExiste = await prisma.mensagem.findFirst({ where: { remetenteId: psicologa.id, destinatarioId: admin.id } });
  if (!msgExiste) await prisma.mensagem.create({ data: { assunto: 'Agenda', conteudo: 'Mensagem real gravada no banco.', remetenteId: psicologa.id, destinatarioId: admin.id } });

  console.log('✅ Seed concluído.');
  console.log('Acessos de teste:');
  console.log('Admin: admin@psicoflow.com.br / 123456');
  console.log('Psicólogo(a): profissional@psicoflow.com.br / 123456');
  console.log('Paciente: paciente@psicoflow.com.br / 123456');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
