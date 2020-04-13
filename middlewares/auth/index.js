const jwt = require('jsonwebtoken');

function auth(jwtSecret) {
    return (req, res, next) => {
        if (req.originalUrl === '/api/auth/login') {
            return next();
        }

        const authorizationValue = req.get('authorization');

        if (!authorizationValue) {
            res.status(401);
            return res.end();
        }

        try {
            var decoded = jwt.verify(authorizationValue, jwtSecret);
            req.auth = decoded;
        } catch (err) {
            res.status(401);
            return res.end();
        }

        next();
    };
}

module.exports = auth;
