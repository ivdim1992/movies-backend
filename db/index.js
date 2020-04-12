const mongoose = require('mongoose');

const Movie = require('./models/Movie');

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

Movie(mongoose);

module.exports = (req, res, next) => {
    req.database = mongoose;
    req.models = mongoose.models;
    next();
};
