const jwt = require('jsonwebtoken');
const config = require('../utils/config');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(400).json({ status: 'error', message: 'Invalid token.' });
    }
};
