module.exports = (...rolesPermitidas) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    if (!rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Acesso negado. Seu perfil não possui permissão para esta ação.'
      });
    }

    next();
  };
};
