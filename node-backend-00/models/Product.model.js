const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        text: true
    },
    desc:{
        type: String,
        text: true
    },
    price:{
        type: Number,
    },
    stock_qty:{
        type: Number
    },
    sold:{
        type: Number,
        default: 0
    },
    images:{
        type: Array
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
},{timestamps: true});

module.exports = Products = mongoose.model('products', ProductSchema);