const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User.model')

exports.authen = (req, res, next) => {
    try{
        const token = req.headers['accesstoken']
        if(!token){
            return res.status(401).json({
                message: 'No token, authentication denied'
            })
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded.user

        console.log(decoded)
        console.log(req.user)
        
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message: 'Token is invalid',
        })
    }
}

exports.adminCheck = async(req, res, next) => {
    try{
        const { username } = req.user
        const adminUser = await User.findOne({username}).exec()
        if(adminUser.role !== 'admin') {
            res.status(403).json({message: 'Access Denied, You are not admin'})
        } else {
            next()
        }

    }catch(err){
        console.log(err);
        res.status(401).json({
            message: 'Access Denied',
        })
    }
}