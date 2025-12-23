module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized access.' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ status: 'error', message: 'Forbidden. Admins only.' });
    }

    next(); 
};
