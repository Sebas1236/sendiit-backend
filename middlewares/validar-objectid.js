const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.body.uid))
        return res.status(404).send('ID inválido');

    next();
}