
const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', productsController.addProduct);
router.put('/:pid', productsController.updateProduct);
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;
