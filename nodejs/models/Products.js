const mongoose = require('mongoose');
const Schema = mongoose.Schema


const productSchema = new Schema({
    productName: {
        type: String
    },
    productPrice: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    campus: {
        type: String
    },
}, {timestamps:true}
);


const Product = mongoose.model('Product', productSchema);
module.exports = Product