const express = require('express');
const app = express();
const logger = require('./logger');
const db = require('./db');
const bodyParser = require('body-parser');

module.exports = {
    start: (port) => {
        console.log('here');
        const adminRoutes = require('./routes/movies');
        const shopRoutes = require('./routes/shop');
        const swaggerUi = require('swagger-ui-express'),
            swaggerDocument = require('./swagger.json');

        app.use(db);

        app.use(bodyParser.urlencoded({ extended: false }));

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use('/api/v1', router);

        app.use(logger);

        app.use('/admin', adminRoutes);
        app.use(shopRoutes);

        app.use((req, res, next) => {
            res.status(404).send('<h1>Page not found</h1>');
        });

        app.listen(port, () => {
            console.log(`app listening on port ${port}`);
        });
    },
};
