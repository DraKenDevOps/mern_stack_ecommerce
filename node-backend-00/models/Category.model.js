const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type: String
    },
    name_en:{
        type: String
    }
},{timestamps: true});

module.exports = Categories = mongoose.model('categories', CategorySchema);