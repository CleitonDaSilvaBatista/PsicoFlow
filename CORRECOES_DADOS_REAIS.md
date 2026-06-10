# Correções aplicadas

- Removidos os acessos rápidos de demonstração do login.
- Removido o uso do objeto fixo `USER_INFO` no frontend.
- Sidebar/topbar agora usam o usuário real salvo após login.
- O frontend usa `/api` no mesmo servidor, evitando apontar fixo para outro localhost.
- Tabelas e listas com nomes de protótipo foram limpas e passam a ser preenchidas por chamadas à API.
- Pacientes, sessões, prontuários, dashboard e financeiro agora respeitam o usuário logado no backend.
- Psicólogo vê apenas pacientes/sessões/prontuários vinculados a ele.
- Paciente vê apenas informações relacionadas ao próprio e-mail cadastrado.
- Admin continua vendo tudo.
- O token JWT e o middleware agora carregam `id`, `nome`, `email` e `role` reais do usuário.

## Importante
Para paciente enxergar seus próprios dados, o `email` do usuário precisa ser igual ao `email` cadastrado na tabela `Paciente`.
