const mongoose = require('mongoose');
const { MONGO_LOCAL_URI } = process.env;
require('dotenv').config();

exports.connect = async() => {
    try{
        await mongoose.connect(MONGO_LOCAL_URI, { useNewUrlParser: true })
        console.log('✅ Connected to database successfully 😀 🥳');
    }catch(err){
        console.log('❌ Error, cannot connect to database 😱 ☠️');
        console.error(err);
        process.exit(1);
    }
}