const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
// Middleware to authenticate JWT
const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication  invalid')
    }

    const token = authHeader.split(' ')[1]
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
         const {userId, name} = decodedToken;
         req.user = {userId, name}
         next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized')
    }
}

module.exports = authenticationMiddleware;