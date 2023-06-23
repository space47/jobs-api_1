const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors') 

const auth = async (req,res,next) => {
    // check header
    const authHeader = req.headers.authorization
    if(!authHeader){
        throw new UnauthenticatedError('Authentication invalid')
    }
    // console.log('Came in middleware='+req.headers.authorization)
    
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes
        // req.user = {userId: payload.userId, name: payload.name}
        // console.log(user)
        // const user = User.findById(payload.userId).select('-password')
        // req.user = user

        const {userId, name} = payload
        console.log(payload)
        req.user = {userId,name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth