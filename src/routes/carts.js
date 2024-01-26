// src/routes/carts.js
const express = require('express');
const cartsController = require('../controllers/cartsController');

const router = express.Router();

router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCartById);
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;

