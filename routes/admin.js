const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(
        '<form action="/admin/add-product" method="POST"><input type="text" name="name"/><button type="submit">Add Product</button></form>'
    );
});

router.post('/add-product', async (req, res, next) => {
    const record = await req.models.Product.create(req.body);
    res.redirect('/');
});

module.exports = router;
