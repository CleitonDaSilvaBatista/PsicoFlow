const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const dashboardController = require('../controllers/dashboard.controller');

router.get('/resumo', auth, dashboardController.resumo);

module.exports = router;