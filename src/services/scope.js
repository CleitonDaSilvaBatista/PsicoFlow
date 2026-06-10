function pacienteWhereForUser(user) {
  if (!user) return { id: -1 };
  if (user.role === 'ADMIN') return {};
  if (user.role === 'PSICOLOGO') {
    return {
      OR: [
        { criadoPorId: user.id },
        { sessoes: { some: { psicologoId: user.id } } }
      ]
    };
  }
  return { email: user.email };
}

function sessaoWhereForUser(user) {
  if (!user) return { id: -1 };
  if (user.role === 'ADMIN') return {};
  if (user.role === 'PSICOLOGO') return { psicologoId: user.id };
  return { paciente: { email: user.email } };
}

function prontuarioWhereForUser(user) {
  if (!user) return { id: -1 };
  if (user.role === 'ADMIN') return {};
  if (user.role === 'PSICOLOGO') {
    return {
      paciente: {
        OR: [
          { criadoPorId: user.id },
          { sessoes: { some: { psicologoId: user.id } } }
        ]
      }
    };
  }
  return { paciente: { email: user.email } };
}

function receitaWhereForUser(user) {
  if (!user) return { id: -1 };
  if (user.role === 'ADMIN') return {};
  if (user.role === 'PSICOLOGO') return { sessao: { psicologoId: user.id } };
  return { paciente: { email: user.email } };
}

module.exports = { pacienteWhereForUser, sessaoWhereForUser, prontuarioWhereForUser, receitaWhereForUser };
