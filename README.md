# PsicoFlow — Frontend Organizado

Projeto frontend estático separado em HTML, CSS e JavaScript.

## Estrutura

```text
psicoflow-organizado/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── img/
└── docs/
```

## Como rodar

Abra o arquivo `index.html` no navegador ou use a extensão Live Server do VS Code.

## Observação

O projeto ainda usa CDNs para Bootstrap, Bootstrap Icons, Google Fonts e Chart.js.
Para apresentar no SENAI, abra com internet ativa para carregar os ícones, fontes e gráficos.


## Módulos adicionados nesta versão

- Autenticação com JWT
- Pacientes
- Sessões/Agenda
- Prontuários
- Financeiro: receitas, despesas, fluxo e resumo
- Convênios: cadastro e vínculo com paciente
- Planos: pacotes de sessões e controle de saldo
- Relatórios: financeiro, operacional, clínico e completo
- Dashboard com métricas reais do banco

Para testar as rotas, consulte `README_API_TESTES.md`.
