const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    user_id:{
        type: Number
    },
    username:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    role:{
        type: String,
        default: 'user'
    },
    status:{
        type: Boolean,
        default: false
    },
    address: String,
    wishlists:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ]
},{ timestamps:true });

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = Users = mongoose.model('users', UserSchema);