
const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(data){
 const hash = await bcrypt.hash(data.senha,10);
 return prisma.user.create({
  data:{ nome:data.nome,email:data.email,senha:hash,role:data.role||'PACIENTE' }
 });
}

async function login(email,senha){
 const user = await prisma.user.findUnique({where:{email}});
 if(!user) throw new Error('Usuário não encontrado');
 const ok = await bcrypt.compare(senha,user.senha);
 if(!ok) throw new Error('Senha inválida');
 const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
 return {token,user:{id:user.id,nome:user.nome,email:user.email,role:user.role}};
}

module.exports={register,login};
