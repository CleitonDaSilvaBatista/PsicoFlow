const prisma = require('../config/prisma');
const { pacienteWhereForUser } = require('./scope');

const include = { paciente: true, sessao: true, criadoPor: { select: { id: true, nome: true, email: true, role: true } } };
function whereForUser(user) {
  if (user.role === 'ADMIN') return {};
  if (user.role === 'PSICOLOGO') return { OR: [{ criadoPorId: user.id }, { paciente: pacienteWhereForUser(user) }] };
  return { paciente: { email: user.email } };
}
async function criar(data, user) {
  return prisma.documento.create({ data: { titulo: data.titulo, tipo: data.tipo || 'OUTRO', conteudo: data.conteudo, modelo: data.modelo, arquivoUrl: data.arquivoUrl, tamanhoKb: data.tamanhoKb ? Number(data.tamanhoKb) : null, pacienteId: data.pacienteId ? Number(data.pacienteId) : null, sessaoId: data.sessaoId ? Number(data.sessaoId) : null, criadoPorId: user.id }, include });
}
async function listar(user) { return prisma.documento.findMany({ where: whereForUser(user), orderBy: { createdAt: 'desc' }, include }); }
async function buscar(id, user) { return prisma.documento.findFirst({ where: { id: Number(id), AND: [whereForUser(user)] }, include }); }
async function atualizar(id, data, user) { const item = await buscar(id, user); if (!item) throw new Error('Documento não encontrado ou sem permissão.'); return prisma.documento.update({ where: { id: Number(id) }, data: { titulo: data.titulo, tipo: data.tipo, conteudo: data.conteudo, modelo: data.modelo, arquivoUrl: data.arquivoUrl, tamanhoKb: data.tamanhoKb ? Number(data.tamanhoKb) : undefined, pacienteId: data.pacienteId ? Number(data.pacienteId) : undefined, sessaoId: data.sessaoId ? Number(data.sessaoId) : undefined }, include }); }
async function remover(id, user) { const item = await buscar(id, user); if (!item) throw new Error('Documento não encontrado ou sem permissão.'); return prisma.documento.delete({ where: { id: Number(id) } }); }
async function gerarRecibo(data, user) { return criar({ titulo: data.titulo || 'Recibo psicológico', tipo: 'RECIBO', pacienteId: data.pacienteId, sessaoId: data.sessaoId, conteudo: data.conteudo || `Recibo referente ao pagamento de R$ ${data.valor || ''}.`, tamanhoKb: 1 }, user); }
module.exports = { criar, listar, buscar, atualizar, remover, gerarRecibo };
