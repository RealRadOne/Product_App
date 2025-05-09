const express = require('express');
const router = express.Router();
var productController = require('../controllers/productController');

router.get('/get_products', productController.getProducts);

router.put('/add_products', productController.putProduct);

module.exports = router;
