function logger(req, res, next) {
    const logLine = `Method: ${req.method}, Url: ${
        req.path
    }, Body: ${JSON.stringify(req.body)}`;

    console.log(logLine);
    next();
}

module.exports = logger;
