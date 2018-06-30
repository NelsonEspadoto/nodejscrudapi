const express = require('express');
var router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

router.get('/', controller.getAll);
router.get('/:productId', controller.getById);
router.put('/:productId', controller.put);
router.delete('/:productId', controller.delete);
router.post('/', authService.authorize, controller.post);

module.exports = router;