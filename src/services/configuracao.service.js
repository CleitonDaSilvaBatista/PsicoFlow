const prisma=require('../config/prisma');
async function buscar(){ return prisma.configuracaoClinica.upsert({where:{id:1},update:{},create:{id:1}}); }
async function salvar(data){ return prisma.configuracaoClinica.upsert({where:{id:1},update:{nome:data.nome,cnpj:data.cnpj,telefone:data.telefone,email:data.email,endereco:data.endereco},create:{id:1,nome:data.nome,cnpj:data.cnpj,telefone:data.telefone,email:data.email,endereco:data.endereco}}); }
module.exports={buscar,salvar};
