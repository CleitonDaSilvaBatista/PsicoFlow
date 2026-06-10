const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const c = require('../controllers/documento.controller');
router.use(auth);
router.post('/', c.criar); router.get('/', c.listar); router.post('/recibo', c.gerarRecibo); router.get('/:id', c.buscar); router.put('/:id', c.atualizar); router.delete('/:id', c.remover);
module.exports = router;
