const express = require('express');
const router = express.Router();

router.get('/movies', (req, res, next) => {
    // sned all movies
});

router.post('/add-movie', async (req, res, next) => {
    const record = await req.models.Product.create(req.body);
    res.redirect('/');
});

module.exports = router;
