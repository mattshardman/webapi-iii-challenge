function error(err,req,res,next) {
    res.status(err.status).json({ error: true, errorMessage: err.message });
}

module.exports = error;
