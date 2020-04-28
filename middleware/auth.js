const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('no token is provided');

    try {
        const decode = jwt.verify(token, config.get('jwtkey'));
        req.user = decode;
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
}