const {Schema, default: mongoose} = require('mongoose');

const productSchema = new Schema({
    name : String,
    price : String,
    brand : String,
    id: Number
})

exports.Product = mongoose.model('Product',productSchema);  // first we decide schema and then we create model for that as model will let uss create real object