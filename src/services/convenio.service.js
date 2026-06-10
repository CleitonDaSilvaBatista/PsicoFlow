const prisma = require('../config/prisma');

async function criarConvenio(data) {
  return prisma.convenio.create({
    data: {
      nome: data.nome,
      percentualCobertura: data.percentualCobertura !== undefined ? Number(data.percentualCobertura) : 70,
      percentualPaciente: data.percentualPaciente !== undefined ? Number(data.percentualPaciente) : 30,
      diaRepasse: data.diaRepasse ? Number(data.diaRepasse) : null,
      ativo: data.ativo !== undefined ? Boolean(data.ativo) : true,
      observacoes: data.observacoes
    }
  });
}

async function listarConvenios() {
  return prisma.convenio.findMany({ orderBy: { nome: 'asc' }, include: { pacientes: true } });
}

async function buscarConvenioPorId(id) {
  return prisma.convenio.findUnique({ where: { id: Number(id) }, include: { pacientes: true } });
}

async function atualizarConvenio(id, data) {
  return prisma.convenio.update({
    where: { id: Number(id) },
    data: {
      nome: data.nome,
      percentualCobertura: data.percentualCobertura !== undefined ? Number(data.percentualCobertura) : undefined,
      percentualPaciente: data.percentualPaciente !== undefined ? Number(data.percentualPaciente) : undefined,
      diaRepasse: data.diaRepasse ? Number(data.diaRepasse) : undefined,
      ativo: data.ativo,
      observacoes: data.observacoes
    }
  });
}

async function deletarConvenio(id) {
  return prisma.convenio.delete({ where: { id: Number(id) } });
}

async function vincularPaciente(data) {
  return prisma.paciente.update({
    where: { id: Number(data.pacienteId) },
    data: { convenioId: Number(data.convenioId) },
    include: { convenio: true }
  });
}

module.exports = { criarConvenio, listarConvenios, buscarConvenioPorId, atualizarConvenio, deletarConvenio, vincularPaciente };
