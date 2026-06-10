# PsicoFlow — módulos completos integrados ao banco

Este ZIP adiciona os módulos solicitados ao backend com Prisma/PostgreSQL e remove o comportamento estático das páginas principais do frontend.

## Módulos incluídos

- Autenticação e controle de acesso por perfil: ADMIN, PSICOLOGO e PACIENTE.
- Agenda/agendamentos com status e sessões vinculadas a paciente/psicólogo.
- Pacientes e prontuários com anamnese e evolução.
- Comunicação e mensagens internas.
- Lembretes de sessão.
- Financeiro com receitas/despesas e vínculo com sessões.
- Planos por paciente com saldo de sessões.
- Documentos: recibos, contratos, laudos, relatórios e modelos.
- Relatórios e dashboard.
- Convênios com percentuais de cobertura/coparticipação.
- Tarefas vinculadas a pacientes/equipe.
- Gestão de espaços/salas com bloqueio de conflito de horário.
- Segurança/backup com exportação JSON e histórico de backup.

## Comandos necessários

Como houve alteração no banco/schema Prisma, rode:

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run seed
npm start
```

Se o banco já tiver dados importantes, faça backup antes de rodar migrations.

## Rotas novas

- `/api/documentos`
- `/api/comunicacao`
- `/api/tarefas`
- `/api/espacos`
- `/api/lembretes`
- `/api/backup`
- `/api/configuracoes/clinica`

## Observação

As telas aparecem vazias quando não há registros reais no banco para o usuário logado. Para paciente, os dados são filtrados pelo e-mail do usuário logado e o e-mail do cadastro do paciente.
