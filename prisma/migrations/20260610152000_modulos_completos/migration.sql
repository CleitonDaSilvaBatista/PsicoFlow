CREATE TYPE "StatusTarefa" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');
CREATE TYPE "PrioridadeTarefa" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');
CREATE TYPE "TipoDocumento" AS ENUM ('RECIBO', 'CONTRATO', 'LAUDO', 'RELATORIO', 'OUTRO');
CREATE TYPE "StatusLembrete" AS ENUM ('PENDENTE', 'ENVIADO', 'CANCELADO');
CREATE TYPE "StatusEspaco" AS ENUM ('ATIVO', 'INATIVO', 'MANUTENCAO');

CREATE TABLE "Documento" (
  "id" SERIAL PRIMARY KEY,
  "titulo" TEXT NOT NULL,
  "tipo" "TipoDocumento" NOT NULL DEFAULT 'OUTRO',
  "conteudo" TEXT,
  "modelo" TEXT,
  "arquivoUrl" TEXT,
  "tamanhoKb" INTEGER,
  "pacienteId" INTEGER,
  "sessaoId" INTEGER,
  "criadoPorId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Mensagem" (
  "id" SERIAL PRIMARY KEY,
  "assunto" TEXT,
  "conteudo" TEXT NOT NULL,
  "remetenteId" INTEGER NOT NULL,
  "destinatarioId" INTEGER NOT NULL,
  "lida" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Lembrete" (
  "id" SERIAL PRIMARY KEY,
  "titulo" TEXT NOT NULL,
  "mensagem" TEXT NOT NULL,
  "canal" TEXT NOT NULL DEFAULT 'EMAIL',
  "enviarEm" TIMESTAMP(3) NOT NULL,
  "status" "StatusLembrete" NOT NULL DEFAULT 'PENDENTE',
  "pacienteId" INTEGER,
  "sessaoId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Tarefa" (
  "id" SERIAL PRIMARY KEY,
  "titulo" TEXT NOT NULL,
  "descricao" TEXT,
  "status" "StatusTarefa" NOT NULL DEFAULT 'PENDENTE',
  "prioridade" "PrioridadeTarefa" NOT NULL DEFAULT 'MEDIA',
  "prazo" TIMESTAMP(3),
  "pacienteId" INTEGER,
  "responsavelId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Espaco" (
  "id" SERIAL PRIMARY KEY,
  "nome" TEXT NOT NULL UNIQUE,
  "descricao" TEXT,
  "capacidade" INTEGER,
  "recursos" TEXT,
  "status" "StatusEspaco" NOT NULL DEFAULT 'ATIVO',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "ReservaEspaco" (
  "id" SERIAL PRIMARY KEY,
  "espacoId" INTEGER NOT NULL,
  "sessaoId" INTEGER UNIQUE,
  "inicio" TIMESTAMP(3) NOT NULL,
  "fim" TIMESTAMP(3) NOT NULL,
  "observacoes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "ReservaEspaco_espacoId_inicio_fim_idx" ON "ReservaEspaco"("espacoId", "inicio", "fim");

CREATE TABLE "ConfiguracaoClinica" (
  "id" INTEGER PRIMARY KEY DEFAULT 1,
  "nome" TEXT,
  "cnpj" TEXT,
  "telefone" TEXT,
  "email" TEXT,
  "endereco" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "BackupRegistro" (
  "id" SERIAL PRIMARY KEY,
  "tipo" TEXT NOT NULL DEFAULT 'EXPORTACAO',
  "formato" TEXT NOT NULL DEFAULT 'JSON',
  "caminho" TEXT,
  "status" TEXT NOT NULL DEFAULT 'GERADO',
  "criadoPor" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "Documento" ADD CONSTRAINT "Documento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Lembrete" ADD CONSTRAINT "Lembrete_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Lembrete" ADD CONSTRAINT "Lembrete_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ReservaEspaco" ADD CONSTRAINT "ReservaEspaco_espacoId_fkey" FOREIGN KEY ("espacoId") REFERENCES "Espaco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ReservaEspaco" ADD CONSTRAINT "ReservaEspaco_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
