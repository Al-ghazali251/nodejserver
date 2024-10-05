const User = require('../models/Users');
const Product = require('../models/Products');
const express = require('express');
const router = express.Router();


router.get('/fetch_users', async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            "message": err.message
        });
    }
});


router.get('/fetch_stores', async (req, res) => {
    try {
        let stores;
        stores = await User.find({
            store: true
        });
        res.status(200).json(stores);
    } catch (err) {
        res.status(500).json({
            "message": err.message
        });
    }
});



router.post('/save_users', async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        campus: req.body.campus,
        store:req.body.store,
        favorites: req.body.favorites
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({
            "message": err.message
        });
    }
});
// Allow users add to favorites
router.post('/favorites/:userId', async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;  // The product ID is expected in the request body

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product ID is already in the user's favorites
        if (user.favorites.includes(productId)) {
            return res.status(400).json({ message: 'Product is already in favorites' });
        }

        // Add the product ID to the user's favorites array (stored as strings)
        user.favorites.push(productId);
        await user.save();

        return res.status(200).json({ message: 'Product added to favorites', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//Remove items from favorites

router.delete('/favorites/:userId', async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;  // The product ID is expected in the request body

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       

        // Add the product ID to the user's favorites array (stored as strings)
        user.favorites.pull(productId);
        await user.save();

        return res.status(200).json({ message: 'Product removed from favorites', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});







// this function allows you to fetch users favorite items from the database
router.get('/favorites/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the favorite products based on stored product IDs
        const favoriteProducts = await Product.find({ _id: { $in: user.favorites } });

        return res.status(200).json({ favorites: favoriteProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});





// PATCH (update) a product
router.patch('/update/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({
            message: 'User not found'
        });

        if (req.body.userName != null) user.userName = req.body.userName;
        if (req.body.address != null) user.address = req.body.address;
        if (req.body.campus != null) user.campus = req.body.campus;
        if (req.body.store != null) user.store = req.body.store;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});



// DELETE a product
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!User) return res.status(404).json({
            message: 'User not found'
        });

        await user.deleteOne();
        res.status(200).json({
            message: 'User deleted'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// POST route to add product to user's favorites
router.post('/add_to_favorites/:userId/favorites', async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;  // The product ID is expected in the request body

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if product is already in user's favorites
        if (user.favorites.includes(productId)) {
            return res.status(400).json({ message: 'Product is already in favorites' });
        }

        // Add product to user's favorites
        user.favorites.push(productId);
        await user.save();

        return res.status(200).json({ message: 'Product added to favorites', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;