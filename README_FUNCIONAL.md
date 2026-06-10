# PsicoFlow - Versão funcional integrada

Esta versão conecta o frontend ao backend nas partes principais do sistema.

## O que foi ajustado

- Login real consumindo `POST /api/auth/login`
- Cadastro real consumindo `POST /api/auth/register`
- Frontend servido pelo próprio Express em `http://localhost:3000`
- Dashboard consumindo dados reais do banco
- Pacientes com listagem, criação e exclusão pelo banco
- Sessões/agenda com criação, listagem e exclusão pelo banco
- Prontuários com criação, listagem e exclusão pelo banco
- Financeiro com receitas, despesas e resumo pelo banco
- Planos com listagem e criação pelo banco
- Convênios com criação pelo banco
- Relatórios consumindo APIs reais
- Seed com dados de apresentação

## Como rodar

Na pasta do projeto:

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run seed
npm start
```

Depois acesse:

```text
http://localhost:3000
```

A API de saúde fica em:

```text
http://localhost:3000/api/health
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

## Observação importante

O sistema está funcional para apresentação acadêmica, com CRUDs principais e integração com banco. Algumas telas secundárias, como suporte, auditoria visual, documentos e comunicação, ainda funcionam como módulos demonstrativos/visuais, pois exigiriam integrações externas específicas como SMTP, armazenamento de arquivos e logs avançados.
