const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res, next) => {
    const allProducts = await req.models.Product.find({});

    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;
