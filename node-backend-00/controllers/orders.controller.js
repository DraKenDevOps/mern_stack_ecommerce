const Orders = require('../models/Order.model')
require('dotenv').config();

exports.getAllOrders = async(req, res) => {
    try{
        let list = await Orders.find({}).select('-__v').populate('orderBy products.product').exec()
        res.status(200).json(list)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.updateOrderStatus = async(req, res) => {
    try{
        const {order_id, status} = req.body
        await Orders.findByIdAndUpdate(order_id, {status: status}, {new:true}).exec()
        res.status(200).send("Order status is update successfully")
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

exports.updateOrder = async(req, res) => {
    try{

        res.status(200).send("Order is update successfully")
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}