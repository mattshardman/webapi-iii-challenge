function name(req, res, next) {
    const { name } = req.body;
    if (req.body.name) {
        req.body.name = name.toUpperCase();
    }
    next();
}

module.exports = name;
