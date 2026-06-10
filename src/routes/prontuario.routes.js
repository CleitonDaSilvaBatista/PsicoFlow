const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const prontuarioController = require('../controllers/prontuario.controller');

router.post('/', auth, prontuarioController.criar);
router.get('/', auth, prontuarioController.listar);
router.get('/:id', auth, prontuarioController.buscarPorId);
router.put('/:id', auth, prontuarioController.atualizar);
router.delete('/:id', auth, prontuarioController.deletar);

module.exports = router;