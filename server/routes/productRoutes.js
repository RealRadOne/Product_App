const express = require('express');
const router = express.Router();
var productController = require('../controllers/productController');

router.get('/get_products', productController.getInfProducts);

router.put('/add_products', productController.putProduct);

router.get('/search_products',productController.searchProducts);

module.exports = router;
