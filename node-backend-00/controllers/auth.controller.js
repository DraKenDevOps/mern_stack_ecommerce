const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// REGISTER
exports.register = async(req, res) => {
    try{
        // ? Check User
        const { username, email, password } = req.body;
        var user = await User.findOne({ username });
        if(user){
            return res.status(400).json({
                message: "User is already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({ 
            username, 
            email, 
            password 
        });

        // ! Encrypt
        user.password = await bcrypt.hash(password, salt);

        // ! Save user to DB
        await user.save();
        res.status(200).json({
            message: "Register Success"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// LOGIN
exports.login = async(req, res) => {
    try{
        const { username, password } = req.body;
        var user = await User.findOneAndUpdate({ username }, {new:true});

        if(user && user.status){ 
            //?
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({
                    message: "Password is incorrect!"
                })
            }
            
            const payload = {
                user:{
                    username: user.username,
                    role: user.role
                }
            }
            
            jwt.sign(payload, process.env.TOKEN_KEY, {
                expiresIn: 28800,
            }, (err, token) => {
                if(err) throw err;
                res.status(200).json({ token, payload });
            })
        } else {
            return res.status(400).json({
                message: "User is not found!"
            })
        }
        
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// CHECK USER
exports.currentUser = async(req, res) => {
    try{
        const user = await User.findOne({username:req.user.username}).select('-password').exec()
        console.log(user)
        res.status(200).json(user)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}