const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const pacienteController = require('../controllers/paciente.controller');

router.post('/', auth, pacienteController.criar);
router.get('/', auth, pacienteController.listar);
router.get('/:id', auth, pacienteController.buscarPorId);
router.put('/:id', auth, pacienteController.atualizar);
router.delete('/:id', auth, pacienteController.deletar);

module.exports = router;