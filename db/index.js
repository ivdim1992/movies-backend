const mongoose = require('mongoose');

const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

Product(mongoose);

module.exports = (req, res, next) => {
    req.database = mongoose;
    req.models = mongoose.models;
    next();
};
