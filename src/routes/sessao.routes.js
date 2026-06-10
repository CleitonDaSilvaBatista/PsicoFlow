const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const sessaoController = require('../controllers/sessao.controller');

router.post('/', auth, sessaoController.criar);
router.get('/', auth, sessaoController.listar);
router.get('/:id', auth, sessaoController.buscarPorId);
router.put('/:id', auth, sessaoController.atualizar);
router.delete('/:id', auth, sessaoController.deletar);

module.exports = router;