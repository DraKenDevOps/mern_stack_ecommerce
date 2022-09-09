const User = require('../models/User.model')
const Products = require('../models/Product.model')
const Carts = require('../models/Cart.model')
const Orders = require('../models/Order.model')

const bcrypt = require('bcryptjs');
require('dotenv').config();

// GET
exports.listUsers = async(req, res) => {
    try{
        const users = await User.find({}).select('-password -__v').exec()
        res.status(200).json(users)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// GET
exports.readUser = async(req, res) => {
    try{
        // create variable to recieve id from url parameter
        const id = req.params.id
        const user = await User.findOne({_id:id}).select('-password -__v').exec()
        // res.status(200).json([user])
        res.status(200).json(user)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// POST
exports.changeStatus = async(req, res) => {
    try{
        console.log('change status',req.body)
        const user = await User.findOneAndUpdate(
            {_id:req.body.id},
            {status:req.body.status}
        )
        res.status(200).json({ message:'Status is updated' })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// POST
exports.changeRole = async(req, res) => {
    try{
        console.log('change role',req.body)
        const user = await User.findOneAndUpdate(
            {_id:req.body.id},
            {role:req.body.role}
        )
        res.status(200).json({ message:'Role is updated' })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// PUT
exports.updateUser = async(req, res) => {
    try{
        console.log('Form Client', req.body)

        const salt = await bcrypt.genSalt(10)

        var { id, password } = req.body.values

        var encrypt = await bcrypt.hash(password, salt)

        const user = await User.findOneAndUpdate(
            {_id:id},
            {password:encrypt}
        )
        res.status(200).json({ message:`Password of user ${user.user_id} is updated` })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

// DELETE
exports.deleteUser = async(req, res) => {
    try{
        const id = req.params.id
        const user = await User.findOneAndDelete({_id:id})
        res.status(200).json({ message:`User ${user.user_id} is deleted` })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.userCart = async(req, res) => {
    try{
        const { cart } = req.body

        let user =  await User.findOne({username:req.user.username}).exec()

        let products = []

        let cartOld = await Carts.findOne({orderBy: user._id}).exec()
        if(cartOld){
            cartOld.remove()
        }

        for(let i=0; i<cart.length; i++){
            let object = {}

            object.product = cart[i]._id
            object.qty = cart[i].qty
            object.price = cart[i].price

            products.push(object)
        }

        let cartTotal = 0
        for (let i=0; i<products.length; i++){
            cartTotal = cartTotal + products[i].price * products[i].qty
        }

        let newCart = await new Carts({
            products,
            cartTotal,
            orderBy: user._id
        }).save()

        res.status(200).json({ message: 'Your order has been saved' })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.getUserCart = async(req, res) => {
    try{
        let user =  await User.findOne({username:req.user.username}).select('-__v, -password').exec()
        let cart = await Carts.findOne({orderBy:user._id}).populate('products.product', "_id title price").exec()

        const { products, cartTotal } = cart

        res.status(200).json({products, cartTotal})

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.saveAddress = async(req, res) => {
    try{
        const userAddress = await User.findOneAndUpdate(
            {username: req.user.username},
            {address: req.body.address}
        ).exec()

        res.status(200).json({ok:true})
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.saveOrder = async(req, res) => {
    try{
        let user = await User.findOne({username: req.user.username}).select('-__v, -password').exec()
        let userCart = await Carts.findOne({orderBy: user._id}).exec()
        let order = await new Orders({
            products: userCart.products,
            orderBy: user._id,
            grandTotal: userCart.cartTotal
        }).save()

        let stockOption = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id},
                    update: { $inc: {stock_qty: -item.qty, sold: +item.qty}}
                }
            }
        })

        let updateStock = await Products.bulkWrite(stockOption)

        res.status(200).json(order)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.getUserOrder = async(req, res) => {
    try{
        let user = await User.findOne({username: req.user.username}).select('-__v, -password').exec()
        let order = await Orders.find({orderBy: user._id}).populate('products.product').exec()
        res.status(200).json(order)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.emptyCart = async(req, res) => {
    try{
        let user = await User.findOne({username:req.user.username}).select('-__v, -password').exec()

        const empty = await Carts.findOneAndRemove({orderBy: user._id}).exec()
        
        res.status(200).json(empty)

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.addWishList = async(req, res) => {
    try{
        const { productId } = req.body

        let user = await User.findOneAndUpdate(
            {username:req.user.username},
            {$addToSet:{wishlists: productId}}
        ).exec()
        
        res.status(200).json({message: "The Product is added to your wishlist"})
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.getWishList = async(req, res) => {
    try{
        let list = await User.findOne({username:req.user.username}).select('wishlists').populate('wishlists').exec()
        
        res.status(200).json(list)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.removeWishList = async(req, res) => {
    try{
        const { productId } = req.params
        let userWish = await User.findOneAndUpdate(
            {username: req.user.username},
            {$pull:{wishlists: productId}}
        ).exec()

        res.status(200).send("Your wishlist has been removed")
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}