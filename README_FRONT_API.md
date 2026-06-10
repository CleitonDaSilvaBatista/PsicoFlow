# PsicoFlow - Frontend ligado às APIs

Esta versão já vem com:

- Login do frontend consumindo `POST /api/auth/login`
- Dashboard consumindo `GET /api/dashboard/resumo`
- Pacientes consumindo `GET /api/pacientes`
- Agenda/Sessões consumindo `GET /api/sessoes`
- Prontuários consumindo `GET /api/prontuarios`
- Financeiro consumindo `GET /api/financeiro/resumo`
- Planos consumindo `GET /api/planos`
- Relatórios consumindo:
  - `GET /api/relatorios/financeiro`
  - `GET /api/relatorios/operacional`
  - `GET /api/relatorios/clinico`
- Seed com pelo menos 3 registros principais:
  - 3 usuários
  - 3 pacientes
  - 3 sessões
  - 3 prontuários
  - 3 receitas
  - 3 despesas
  - 3 convênios
  - 3 planos

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

API:

```text
http://localhost:3000/api
```

Frontend:

Abra o arquivo `index.html` com Live Server ou use:

```bash
npx serve .
```

## Acessos de teste

Admin:

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

## Observação

Para o frontend consumir a API corretamente, o backend precisa estar rodando em:

```text
http://localhost:3000
```
