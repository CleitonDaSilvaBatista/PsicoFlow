# Documentação Técnica — PsicoFlow

## 1. Visão Geral

O **PsicoFlow** é um sistema web para gestão de clínica psicológica. A aplicação foi desenvolvida para centralizar processos clínicos, administrativos e financeiros, permitindo cadastro de pacientes, agendamento de sessões, prontuários, controle financeiro, planos, convênios, relatórios e dashboard.

O sistema atende três perfis principais:

- **Administrador:** acesso amplo a usuários, pacientes, agenda, financeiro, relatórios e configurações.
- **Psicólogo:** acesso a agenda, pacientes, sessões, prontuários e tarefas clínicas.
- **Paciente:** acesso a informações relacionadas às suas consultas, documentos e plano.

## 2. Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- Chart.js

### Backend
- Node.js
- Express.js

### Banco de Dados
- PostgreSQL

### ORM
- Prisma ORM

### Segurança
- Bcrypt para criptografia de senhas
- JWT para autenticação
- Middleware de autenticação para proteger rotas
- Controle de perfil por papel de usuário

### Organização
- Arquitetura MVC com separação entre rotas, controllers, services e camada de banco via Prisma.

## 3. Arquitetura MVC

O projeto segue uma arquitetura em camadas:

```text
src/
├── app.js
├── server.js
├── config/
│   └── prisma.js
├── routes/
├── controllers/
├── services/
└── middlewares/
```

### Rotas
Recebem as requisições HTTP e direcionam para os controllers.

Exemplo:

```text
src/routes/paciente.routes.js
```

### Controllers
Controlam entrada e saída das requisições, tratando respostas e erros.

Exemplo:

```text
src/controllers/paciente.controller.js
```

### Services
Concentram as regras de negócio e comunicação com o Prisma.

Exemplo:

```text
src/services/paciente.service.js
```

### Config
Centraliza configurações de infraestrutura, como conexão Prisma.

```text
src/config/prisma.js
```

### Middlewares
Protegem rotas e validam autenticação por token JWT.

```text
src/middlewares/auth.middleware.js
```

## 4. Funcionalidades Implementadas

### Autenticação
- Cadastro de usuários
- Login
- Senha criptografada
- Geração de token JWT
- Perfis: ADMIN, PSICOLOGO e PACIENTE

### Pacientes
- Cadastro de pacientes
- Listagem
- Busca individual
- Atualização
- Exclusão
- Relacionamento com convênio, plano, sessões e prontuários

### Agenda / Sessões
- Criação de sessões
- Status da sessão: PENDENTE, CONFIRMADA, REALIZADA e CANCELADA
- Associação com paciente e psicólogo
- Valor da sessão

### Prontuário
- Registro de anamnese
- Registro de evolução clínica
- Observações
- Associação com paciente e sessão

### Financeiro
- Cadastro de receitas
- Cadastro de despesas
- Fluxo financeiro
- Associação de receita com sessão e paciente

### Planos
- Cadastro de planos
- Pacote de sessões
- Controle de sessões contratadas e utilizadas
- Associação de plano ao paciente

### Convênios
- Cadastro de convênios
- Percentual de cobertura
- Percentual de coparticipação do paciente
- Associação com pacientes

### Relatórios
- Relatório financeiro
- Relatório clínico
- Relatório operacional
- Relatório completo

### Dashboard
- Total de pacientes
- Total de sessões
- Sessões confirmadas
- Sessões realizadas
- Total de prontuários
- Receita prevista/total
- Indicadores administrativos

## 5. Decisões Técnicas

### Uso do PostgreSQL
O PostgreSQL foi escolhido por ser um banco relacional robusto, adequado para dados estruturados e com relacionamentos entre usuários, pacientes, sessões, prontuários, receitas e planos.

### Uso do Prisma ORM
O Prisma facilita a modelagem do banco, criação de migrations, relacionamento entre tabelas e consultas mais seguras.

### Uso de JWT
O JWT permite proteger rotas e manter autenticação stateless, sendo adequado para APIs REST.

### Separação MVC
A separação MVC melhora organização, manutenção e escalabilidade do projeto.

### Frontend integrado ao backend
O frontend consome as APIs reais do backend, evitando que a aplicação fique apenas estática.
