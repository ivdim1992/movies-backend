const express = require('express');
const app = express();
const logger = require('./logger');
const db = require('./db');
const bodyParser = require('body-parser');

module.exports = {
    start: (port) => {
        const moviesRoutes = require('./routes/movies');
        const userRoutes = require('./routes/user');
        const swaggerRoutes = require('./routes/swagger');

        const helmet = require('helmet');

        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use(db);
        app.use('/movies', logger);

        app.use(swaggerRoutes);

        app.use(moviesRoutes);
        app.use(userRoutes);

        app.use((req, res, next) => {
            res.status(404).send('<h1>Page not found</h1>');
        });

        app.listen(port, () => {
            console.log(`app listening on port ${port}`);
        });
    },
};
