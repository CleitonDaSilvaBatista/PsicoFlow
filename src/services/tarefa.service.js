const prisma=require('../config/prisma');
function where(user){ if(user.role==='ADMIN') return {}; if(user.role==='PSICOLOGO') return { OR:[{responsavelId:user.id},{paciente:{sessoes:{some:{psicologoId:user.id}}}}]}; return { paciente:{email:user.email} }; }
const include={paciente:true,responsavel:{select:{id:true,nome:true,email:true,role:true}}};
async function criar(data,user){return prisma.tarefa.create({data:{titulo:data.titulo,descricao:data.descricao,status:data.status||'PENDENTE',prioridade:data.prioridade||'MEDIA',prazo:data.prazo?new Date(data.prazo):null,pacienteId:data.pacienteId?Number(data.pacienteId):null,responsavelId:data.responsavelId?Number(data.responsavelId):user.id},include});}
async function listar(user){return prisma.tarefa.findMany({where:where(user),orderBy:{createdAt:'desc'},include});}
async function buscar(id,user){return prisma.tarefa.findFirst({where:{id:Number(id),AND:[where(user)]},include});}
async function atualizar(id,data,user){const t=await buscar(id,user); if(!t) throw new Error('Tarefa não encontrada ou sem permissão.'); return prisma.tarefa.update({where:{id:Number(id)},data:{titulo:data.titulo,descricao:data.descricao,status:data.status,prioridade:data.prioridade,prazo:data.prazo?new Date(data.prazo):undefined,pacienteId:data.pacienteId?Number(data.pacienteId):undefined,responsavelId:data.responsavelId?Number(data.responsavelId):undefined},include});}
async function remover(id,user){const t=await buscar(id,user); if(!t) throw new Error('Tarefa não encontrada ou sem permissão.'); return prisma.tarefa.delete({where:{id:Number(id)}});}
module.exports={criar,listar,buscar,atualizar,remover};
