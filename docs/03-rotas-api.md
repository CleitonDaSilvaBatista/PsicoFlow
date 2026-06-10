# Rotas da API — PsicoFlow

Todas as rotas protegidas devem receber o header:

```text
Authorization: Bearer TOKEN
```

## Autenticação

```http
POST /api/auth/register
POST /api/auth/login
```

## Usuário

```http
GET /api/users/me
```

## Pacientes

```http
POST /api/pacientes
GET /api/pacientes
GET /api/pacientes/:id
PUT /api/pacientes/:id
DELETE /api/pacientes/:id
```

## Sessões / Agenda

```http
POST /api/sessoes
GET /api/sessoes
GET /api/sessoes/:id
PUT /api/sessoes/:id
DELETE /api/sessoes/:id
```

## Prontuários

```http
POST /api/prontuarios
GET /api/prontuarios
GET /api/prontuarios/:id
PUT /api/prontuarios/:id
DELETE /api/prontuarios/:id
```

## Financeiro

```http
GET /api/financeiro/resumo

POST /api/financeiro/receitas
GET /api/financeiro/receitas
GET /api/financeiro/receitas/:id
PUT /api/financeiro/receitas/:id
DELETE /api/financeiro/receitas/:id

POST /api/financeiro/despesas
GET /api/financeiro/despesas
GET /api/financeiro/despesas/:id
PUT /api/financeiro/despesas/:id
DELETE /api/financeiro/despesas/:id
```

## Planos

```http
POST /api/planos
GET /api/planos
GET /api/planos/:id
PUT /api/planos/:id
DELETE /api/planos/:id
POST /api/planos/atribuir
GET /api/planos/pacientes
PATCH /api/planos/pacientes/:id/consumir-sessao
```

## Convênios

```http
POST /api/convenios
GET /api/convenios
GET /api/convenios/:id
PUT /api/convenios/:id
DELETE /api/convenios/:id
POST /api/convenios/vincular-paciente
```

## Dashboard

```http
GET /api/dashboard/resumo
```

## Relatórios

```http
GET /api/relatorios/financeiro
GET /api/relatorios/operacional
GET /api/relatorios/clinico
GET /api/relatorios/completo
```

## Outros módulos

O sistema também possui rotas para:

```text
backup
comunicação
configuração
documentos
espaços
lembretes
tarefas
```
