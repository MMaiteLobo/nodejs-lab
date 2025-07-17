const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', authMiddleware.requireAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', authMiddleware.requireAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', authMiddleware.requireAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', authMiddleware.requireAuth, adminController.getEditProduct);

router.post('/edit-product', authMiddleware.requireAuth, adminController.postEditProduct);

router.post('/delete-product', authMiddleware.requireAuth, adminController.postDeleteProduct);

module.exports = router;
