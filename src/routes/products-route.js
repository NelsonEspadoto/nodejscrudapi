const express = require('express');
var router = express.Router();
const controller = require('../controllers/product-controller');

router.get('/', controller.getAll);
router.get('/:productId', controller.getById);
router.put('/:productId', controller.put);
router.delete('/:productId', controller.delete);
router.post('/', controller.post);

module.exports = router;