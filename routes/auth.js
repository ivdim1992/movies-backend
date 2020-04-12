const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

module.exports = (jwtSecret) => {
    router.post('/auth/login', async (req, res, next) => {
        const token = jwt.sign({ foo: 'bar' }, jwtSecret);

        res.status(200).setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ token }));
    });
    return router;
};
