const mongoose = require('mongoose');
const Schema = mongoose.Schema


const UserSchema = new Schema({
    userName: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    campus: {
        type: String
    },
    store:{
        type:Boolean
    },
    favorites: [{
        type: String  // Store product IDs as strings
    }]
}, {timestamps:true}
);


const User = mongoose.model('User', UserSchema);
module.exports = User