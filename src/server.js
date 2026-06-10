
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 PsicoFlow API iniciada`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📦 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🕒 Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
});
