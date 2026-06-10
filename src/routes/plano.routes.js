const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const planoController = require('../controllers/plano.controller');

router.post('/', auth, planoController.criar);
router.get('/', auth, planoController.listar);
router.get('/pacientes', auth, planoController.listarPlanosPacientes);
router.post('/atribuir', auth, planoController.atribuir);
router.patch('/pacientes/:id/consumir-sessao', auth, planoController.consumirSessao);
router.get('/:id', auth, planoController.buscarPorId);
router.put('/:id', auth, planoController.atualizar);
router.delete('/:id', auth, planoController.deletar);

module.exports = router;
