const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const controller = require('../controllers/auditoria.controller');

router.use(auth, role('ADMIN'));
router.get('/', controller.listar);

module.exports = router;
