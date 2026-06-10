/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Convenio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Despesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Plano` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Receita` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusFinanceiro" AS ENUM ('PENDENTE', 'PAGO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoDespesa" AS ENUM ('FIXA', 'VARIAVEL');

-- CreateEnum
CREATE TYPE "StatusPlanoPaciente" AS ENUM ('ATIVO', 'ENCERRADO', 'CANCELADO');

-- AlterTable
ALTER TABLE "Convenio" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "diaRepasse" INTEGER,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "percentualPaciente" DOUBLE PRECISION NOT NULL DEFAULT 30,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Despesa" ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "dataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "status" "StatusFinanceiro" NOT NULL DEFAULT 'PAGO',
ADD COLUMN     "tipo" "TipoDespesa" NOT NULL DEFAULT 'VARIAVEL',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "convenioId" INTEGER;

-- AlterTable
ALTER TABLE "Plano" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descontoPercentual" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Receita" ADD COLUMN     "categoria" TEXT DEFAULT 'Sessão',
ADD COLUMN     "dataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "formaPagamento" TEXT,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "pacienteId" INTEGER,
ADD COLUMN     "sessaoId" INTEGER,
ADD COLUMN     "status" "StatusFinanceiro" NOT NULL DEFAULT 'PAGO',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "PlanoPaciente" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "planoId" INTEGER NOT NULL,
    "sessoesContratadas" INTEGER NOT NULL,
    "sessoesUtilizadas" INTEGER NOT NULL DEFAULT 0,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),
    "status" "StatusPlanoPaciente" NOT NULL DEFAULT 'ATIVO',
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanoPaciente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Convenio_nome_key" ON "Convenio"("nome");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_convenioId_fkey" FOREIGN KEY ("convenioId") REFERENCES "Convenio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoPaciente" ADD CONSTRAINT "PlanoPaciente_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoPaciente" ADD CONSTRAINT "PlanoPaciente_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "Sessao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
