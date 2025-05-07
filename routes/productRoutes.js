const express = require('express')
const router = express.Router();
var productController = require('../controllers/productController');

router.get('/get_products',productController.getProducts);

router.put('/add_products',(req,res)=>{
    const {ID,Name,Type} = req.body;
    productController.putProduct(ID,Name,Type);
    res.status(201).json({message:'Added Successfully'});
});

router.patch('/update_products',(req,res)=>{
    const{ID,Type} = req.body;
    productController.updateProduct(ID,Type);
    res.status(201).json({message:'Updated Successfully'});
})

module.exports = router;