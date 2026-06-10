const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');

router.get('/me', auth, (req, res) => {
  res.json({
    mensagem: 'Acesso autorizado',
    usuario: req.user
  });
});

module.exports = router;