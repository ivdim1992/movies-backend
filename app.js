const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./middlewares/logger');
const db = require('./middlewares/db');
const auth = require('./middlewares/auth');

const moviesRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');
const swaggerRoutes = require('./routes/swagger');
const authRoutes = require('./routes/auth');

const app = express();

module.exports = {
    start: ({ host, port, jwtSecret }) => {
        const authMiddleware = auth(jwtSecret);
        app.use(helmet());

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(db);
        app.get('/api/auth/verify', authMiddleware, (req, res) => {
            res.status(200);
            res.end();
        });
        app.use('/api', logger, authMiddleware);

        app.use(swaggerRoutes);

        app.use('/api', authRoutes(jwtSecret), moviesRoutes, userRoutes);

        app.use((req, res, next) => {
            res.status(404).send('<h1>Page not found</h1>');
        });

        app.use((err, req, res, next) => {
            res.status(500);
            res.json(err);
        });

        app.listen(port, () => {
            console.log(`app listening on port ${port}`);
        });
    },
};
