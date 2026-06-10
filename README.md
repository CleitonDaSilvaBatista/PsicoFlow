# PsicoFlow — Sistema de Gestão para Clínica Psicológica

Projeto desenvolvido para a Atividade Final de IHC — Interface Homem Computador.

## Objetivo

Desenvolver uma aplicação web para gestão de clínica psicológica, integrando processos clínicos, administrativos e financeiros.

## Principais Módulos

- Autenticação e controle de acesso
- Pacientes
- Agenda e sessões
- Prontuários
- Financeiro
- Planos
- Convênios
- Dashboard
- Relatórios
- Tarefas
- Documentos
- Comunicação
- Espaços
- Backup

## Tecnologias

- HTML, CSS e JavaScript
- Bootstrap
- Chart.js
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT
- Bcrypt

## Como rodar

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run seed
npm start
```

Acesse:

```text
http://localhost:3000
```

## Login de Teste

```text
admin@psicoflow.com.br
123456
```

## Documentação

A documentação completa está na pasta `docs/`:

```text
docs/
├── 01-arquitetura-funcionalidades.md
├── 02-modelagem-banco.md
├── 03-rotas-api.md
├── 04-manual-execucao.md
├── 05-roteiro-demonstracao.md
└── 06-checklist-entrega.md
```

## Requisitos da Entrega

O projeto contempla:

- Banco de dados modelado com relacionamentos adequados
- Interface web navegável com rotas funcionando
- Relatório e dashboard implementados
- Demonstração funcional
- Documentação técnica
