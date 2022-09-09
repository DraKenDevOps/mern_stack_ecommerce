const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            qty: Number,
            price: Number
        }
    ],
    cartTotal: Number,
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true});

module.exports = Carts = mongoose.model('carts', CartSchema);