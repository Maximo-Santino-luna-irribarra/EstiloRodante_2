const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/encuestaController');

router.post('/', ctrl.crear);
router.post('/omitida', ctrl.omitir);
router.get('/', ctrl.listar);

module.exports = router;
