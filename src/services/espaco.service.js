const prisma = require('../config/prisma');

async function criarEspaco(data) {
  return prisma.espaco.create({
    data: {
      nome: data.nome,
      descricao: data.descricao,
      capacidade: data.capacidade ? Number(data.capacidade) : null,
      recursos: data.recursos,
      status: data.status || 'ATIVO'
    }
  });
}

async function listarEspacos() {
  return prisma.espaco.findMany({
    orderBy: { nome: 'asc' },
    include: {
      reservas: {
        include: {
          sessao: {
            include: {
              paciente: true,
              psicologo: { select: { id: true, nome: true, email: true, role: true } }
            }
          }
        }
      }
    }
  });
}

async function atualizarEspaco(id, data) {
  return prisma.espaco.update({
    where: { id: Number(id) },
    data: {
      nome: data.nome,
      descricao: data.descricao,
      capacidade: data.capacidade ? Number(data.capacidade) : undefined,
      recursos: data.recursos,
      status: data.status
    }
  });
}

async function removerEspaco(id) {
  return prisma.espaco.delete({ where: { id: Number(id) } });
}

async function reservar(data) {
  const espacoId = Number(data.espacoId);
  const inicio = new Date(data.inicio);
  const fim = new Date(data.fim);
  const conflito = await prisma.reservaEspaco.findFirst({
    where: { espacoId, OR: [{ inicio: { lt: fim }, fim: { gt: inicio } }] }
  });
  if (conflito) throw new Error('Este espaço já está reservado neste horário.');
  return prisma.reservaEspaco.create({
    data: {
      espacoId,
      sessaoId: data.sessaoId ? Number(data.sessaoId) : null,
      inicio,
      fim,
      observacoes: data.observacoes
    },
    include: { espaco: true, sessao: { include: { paciente: true } } }
  });
}

async function listarReservas() {
  return prisma.reservaEspaco.findMany({
    orderBy: { inicio: 'asc' },
    include: {
      espaco: true,
      sessao: {
        include: {
          paciente: true,
          psicologo: { select: { id: true, nome: true, email: true, role: true } }
        }
      }
    }
  });
}

module.exports = { criarEspaco, listarEspacos, atualizarEspaco, removerEspaco, reservar, listarReservas };
