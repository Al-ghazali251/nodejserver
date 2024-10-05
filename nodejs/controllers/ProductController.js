const Product = require('../models/Products');
const express = require('express');
const router = express.Router();


router.get('/fetch_products', async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            "message": err.message
        });
    }
});


router.get('/fetch_products', async (req, res) => {
    try {
        const { campus } = req.query; // Get the campus from the query parameters

        let products;
        
        // If 'campus' is provided, filter by campus, otherwise return all products
        if (campus) {
            products = await Product.find({ campus: campus });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            "message": err.message
        });
    }
});



router.post('/save_products', async (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        phoneNumber: req.body.phoneNumber,
        campus: req.body.campus,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({
            "message": err.message
        });
    }
});




// PATCH (update) a product
router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({
            message: 'Product not found'
        });

        if (req.body.productName != null) product.productName = req.body.productName;
        if (req.body.productPrice != null) product.productPrice = req.body.productPrice;
        if (req.body.campus != null) product.campus = req.body.campus;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});



// DELETE a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({
            message: 'Product not found'
        });

        await product.remove();
        res.status(200).json({
            message: 'Product deleted'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;