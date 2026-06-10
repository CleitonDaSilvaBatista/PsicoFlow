const prisma = require('../config/prisma');
async function enviar(data, user){ return prisma.mensagem.create({ data: { assunto:data.assunto, conteudo:data.conteudo, remetenteId:user.id, destinatarioId:Number(data.destinatarioId) }, include:{ remetente:{select:{id:true,nome:true,email:true,role:true}}, destinatario:{select:{id:true,nome:true,email:true,role:true}} } }); }
async function listar(user){ return prisma.mensagem.findMany({ where:{ OR:[{remetenteId:user.id},{destinatarioId:user.id}] }, orderBy:{createdAt:'desc'}, include:{ remetente:{select:{id:true,nome:true,email:true,role:true}}, destinatario:{select:{id:true,nome:true,email:true,role:true}} } }); }
async function marcarLida(id,user){ const m=await prisma.mensagem.findFirst({where:{id:Number(id),destinatarioId:user.id}}); if(!m) throw new Error('Mensagem não encontrada.'); return prisma.mensagem.update({where:{id:Number(id)},data:{lida:true}}); }
async function usuarios(){ return prisma.user.findMany({where:{ativo:true}, select:{id:true,nome:true,email:true,role:true}, orderBy:{nome:'asc'}}); }
module.exports={enviar,listar,marcarLida,usuarios};
