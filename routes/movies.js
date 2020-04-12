const express = require('express');
const ObjectId = require('mongodb').ObjectId;
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

router.get('/movies/:movieId', async (req, res, next) => {
    const id = new ObjectId(req.params.movieId);
    const movie = await req.models.Movie.find({ _id: id });

    res.status(200).setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(movie));
});

router.put('/movies/:movieId', async (req, res, next) => {
    const id = new ObjectId(req.params.movieId);
    await req.models.Movie.update({ _id: id }, req.body);

    res.status(200).setHeader('Content-Type', 'application/json');
    return res.end(
        JSON.stringify(Object.assign({}, req.body, { _id: req.params.movieId }))
    );
});

router.delete('/movies/:movieId', async (req, res, next) => {
    const id = new ObjectId(req.params.movieId);
    await req.models.Movie.deleteOne({ _id: id });

    res.status(200).setHeader('Content-Type', 'application/json');
    return res.end();
});
module.exports = router;
