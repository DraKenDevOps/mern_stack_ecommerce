const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
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
    grandTotal: Number,
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: 'Pending'
    }
},{timestamps: true});

module.exports = Orders = mongoose.model('orders', OrderSchema);