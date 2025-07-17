const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// /admin/add-product => GET
router.get('/', shopController.getIndex);

// /admin/products => GET
router.get('/products', shopController.getProducts);

// /admin/products/:productId => GET
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);


module.exports = router;
