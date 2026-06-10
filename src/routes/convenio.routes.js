const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const convenioController = require('../controllers/convenio.controller');

router.post('/', auth, convenioController.criar);
router.get('/', auth, convenioController.listar);
router.post('/vincular-paciente', auth, convenioController.vincularPaciente);
router.get('/:id', auth, convenioController.buscarPorId);
router.put('/:id', auth, convenioController.atualizar);
router.delete('/:id', auth, convenioController.deletar);

module.exports = router;
