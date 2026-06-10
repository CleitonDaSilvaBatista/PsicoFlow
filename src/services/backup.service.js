const prisma=require('../config/prisma');
async function exportarJson(user){
 const [pacientes,sessoes,prontuarios,receitas,despesas,documentos,planos,convenios,tarefas,espacos]=await Promise.all([
  prisma.paciente.findMany(), prisma.sessao.findMany(), prisma.prontuario.findMany(), prisma.receita.findMany(), prisma.despesa.findMany(), prisma.documento.findMany(), prisma.plano.findMany(), prisma.convenio.findMany(), prisma.tarefa.findMany(), prisma.espaco.findMany()
 ]);
 const registro=await prisma.backupRegistro.create({data:{tipo:'EXPORTACAO',formato:'JSON',status:'GERADO',criadoPor:user.email}});
 return {registro, dados:{pacientes,sessoes,prontuarios,receitas,despesas,documentos,planos,convenios,tarefas,espacos}};
}
async function historico(){return prisma.backupRegistro.findMany({orderBy:{createdAt:'desc'}})}
module.exports={exportarJson,historico};
