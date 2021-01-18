const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // GET TOKEN FROM HEADER
    const token = req.header('x-auth-token');

    // CHECK IF NOT TOKEN
    if (!token) {
        return res.status(401).json({ msg: 'No token.  Authorization Denied.' });
    }

    // VERIFY TOKEN
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' })
    }
}