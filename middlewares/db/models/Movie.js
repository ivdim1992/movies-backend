const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
