const prisma=require('../config/prisma'); const {pacienteWhereForUser}=require('./scope');
function where(user){ if(user.role==='ADMIN')return{}; if(user.role==='PSICOLOGO')return{paciente:pacienteWhereForUser(user)}; return{paciente:{email:user.email}}; }
async function criar(data){return prisma.lembrete.create({data:{titulo:data.titulo,mensagem:data.mensagem,canal:data.canal||'EMAIL',enviarEm:new Date(data.enviarEm),status:data.status||'PENDENTE',pacienteId:data.pacienteId?Number(data.pacienteId):null,sessaoId:data.sessaoId?Number(data.sessaoId):null},include:{paciente:true,sessao:true}})}
async function listar(user){return prisma.lembrete.findMany({where:where(user),orderBy:{enviarEm:'asc'},include:{paciente:true,sessao:true}})}
async function atualizar(id,data){return prisma.lembrete.update({where:{id:Number(id)},data:{titulo:data.titulo,mensagem:data.mensagem,canal:data.canal,enviarEm:data.enviarEm?new Date(data.enviarEm):undefined,status:data.status,pacienteId:data.pacienteId?Number(data.pacienteId):undefined,sessaoId:data.sessaoId?Number(data.sessaoId):undefined},include:{paciente:true,sessao:true}})}
async function gerarAutomaticos(){
 const alvo=new Date(); alvo.setDate(alvo.getDate()+1);
 const inicio=new Date(alvo); inicio.setHours(0,0,0,0); const fim=new Date(alvo); fim.setHours(23,59,59,999);
 const sessoes=await prisma.sessao.findMany({where:{dataHora:{gte:inicio,lte:fim},status:{in:['PENDENTE','CONFIRMADA']}},include:{paciente:true}});
 const criados=[]; for(const s of sessoes){const existe=await prisma.lembrete.findFirst({where:{sessaoId:s.id}}); if(!existe) criados.push(await criar({titulo:'Lembrete de sessão',mensagem:`Você possui sessão agendada em ${s.dataHora.toLocaleString('pt-BR')}.`,enviarEm:new Date(),pacienteId:s.pacienteId,sessaoId:s.id}));}
 return criados;
}
module.exports={criar,listar,atualizar,gerarAutomaticos};
