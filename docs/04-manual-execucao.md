# Manual de Execução — PsicoFlow

## 1. Pré-requisitos

Instalar:

- Node.js
- PostgreSQL
- VS Code
- DBeaver ou pgAdmin

## 2. Configuração do Banco

Criar o banco:

```sql
CREATE DATABASE clinica_psicologia;
```

## 3. Configuração do Ambiente

Criar arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/clinica_psicologia"
JWT_SECRET="segredo_clinica_psicologia"
PORT=3000
```

## 4. Instalação

```bash
npm install
```

## 5. Executar Migrations

```bash
npx prisma migrate dev
npx prisma generate
```

## 6. Popular Banco com Dados de Teste

```bash
npm run seed
```

## 7. Rodar o Sistema

```bash
npm start
```

## 8. Acessar

```text
http://localhost:3000
```

## 9. Usuários de Teste

Administrador:

```text
admin@psicoflow.com.br
123456
```

Psicóloga:

```text
mariana@psicoflow.com.br
123456
```

Paciente:

```text
ana@email.com
123456
```
