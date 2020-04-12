const express = require('express');
const router = express.Router();

router.get('/movies', async (req, res, next) => {
    if (req.get('accept') !== 'application/json') {
        res.status(400);
        const errorMessage = 'Accept only application/json';

        return res.end(JSON.stringify({ error: errorMessage }));
    }

    const movies = await req.models.Movie.find({});

    // res.json(movies);
    res.status(200).setHeader('Content-Type', 'application/json');

    return res.end(JSON.stringify(movies));
});

router.post('/movies', async (req, res, next) => {
    const movie = await req.models.Movie.create(req.body);

    res.status(201).setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(movie));
});

module.exports = router;
