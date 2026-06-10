# PsicoFlow — Testes da API

Depois de baixar o zip, rode:

```bash
npm install
npx prisma migrate dev --name modulos_financeiro_planos_convenios_relatorios
npx prisma generate
npm start
```

## 1. Login

POST `http://localhost:3000/api/auth/login`

```json
{
  "email": "cleiton@email.com",
  "senha": "123456"
}
```

Copie o `token` e use nas rotas protegidas:

`Authorization: Bearer SEU_TOKEN`

## 2. Receita

POST `http://localhost:3000/api/financeiro/receitas`

```json
{
  "descricao": "Pagamento sessão Ana Beatriz",
  "valor": 150,
  "formaPagamento": "Pix",
  "categoria": "Sessão",
  "status": "PAGO",
  "pacienteId": 1,
  "sessaoId": 2
}
```

GET `http://localhost:3000/api/financeiro/receitas`

## 3. Despesa

POST `http://localhost:3000/api/financeiro/despesas`

```json
{
  "descricao": "Aluguel da sala",
  "valor": 900,
  "categoria": "Aluguel",
  "tipo": "FIXA",
  "status": "PAGO"
}
```

GET `http://localhost:3000/api/financeiro/despesas`

## 4. Resumo financeiro

GET `http://localhost:3000/api/financeiro/resumo`

## 5. Convênio

POST `http://localhost:3000/api/convenios`

```json
{
  "nome": "Saúde Mais",
  "percentualCobertura": 70,
  "percentualPaciente": 30,
  "diaRepasse": 10,
  "observacoes": "Convênio paga 70% da sessão."
}
```

Vincular convênio ao paciente:

POST `http://localhost:3000/api/convenios/vincular-paciente`

```json
{
  "pacienteId": 1,
  "convenioId": 1
}
```

## 6. Plano

POST `http://localhost:3000/api/planos`

```json
{
  "nome": "Pacote 10 sessões",
  "quantidadeSessoes": 10,
  "valor": 1200,
  "descontoPercentual": 15,
  "descricao": "Plano mensal com desconto."
}
```

Atribuir plano ao paciente:

POST `http://localhost:3000/api/planos/atribuir`

```json
{
  "pacienteId": 1,
  "planoId": 1
}
```

Consumir uma sessão do plano:

PATCH `http://localhost:3000/api/planos/pacientes/1/consumir-sessao`

## 7. Relatórios

GET `http://localhost:3000/api/relatorios/financeiro`

GET `http://localhost:3000/api/relatorios/operacional`

GET `http://localhost:3000/api/relatorios/clinico`

GET `http://localhost:3000/api/relatorios/completo`

## 8. Dashboard completo

GET `http://localhost:3000/api/dashboard/resumo`
