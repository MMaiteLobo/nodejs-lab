const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', authMiddleware.requireAuth, shopController.getCart);

router.post('/cart', authMiddleware.requireAuth, shopController.postCart);

router.post('/cart-delete-item', authMiddleware.requireAuth, shopController.postCartDeleteProduct);

router.post('/create-order', authMiddleware.requireAuth, shopController.postOrder);

router.get('/orders', authMiddleware.requireAuth, shopController.getOrders);

module.exports = router;
