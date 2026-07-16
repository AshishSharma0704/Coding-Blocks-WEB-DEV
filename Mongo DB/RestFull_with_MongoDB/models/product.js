const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
})
const Products = mongoose.model('Products', productSchema);
module.exports = Products;
