const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const relatorioController = require('../controllers/relatorio.controller');

router.get('/financeiro', auth, relatorioController.financeiro);
router.get('/operacional', auth, relatorioController.operacional);
router.get('/clinico', auth, relatorioController.clinico);
router.get('/completo', auth, relatorioController.completo);

module.exports = router;
