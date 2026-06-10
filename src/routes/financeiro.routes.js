const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const financeiroController = require('../controllers/financeiro.controller');

router.get('/resumo', auth, financeiroController.resumo);

router.post('/receitas', auth, financeiroController.criarReceita);
router.get('/receitas', auth, financeiroController.listarReceitas);
router.get('/receitas/:id', auth, financeiroController.buscarReceitaPorId);
router.put('/receitas/:id', auth, financeiroController.atualizarReceita);
router.delete('/receitas/:id', auth, financeiroController.deletarReceita);

router.post('/despesas', auth, financeiroController.criarDespesa);
router.get('/despesas', auth, financeiroController.listarDespesas);
router.get('/despesas/:id', auth, financeiroController.buscarDespesaPorId);
router.put('/despesas/:id', auth, financeiroController.atualizarDespesa);
router.delete('/despesas/:id', auth, financeiroController.deletarDespesa);

module.exports = router;
