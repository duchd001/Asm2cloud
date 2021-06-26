const mongoose = require('mongoose')
const schema = mongoose.Schema


let userSchema = new schema({
    productname: {
        type: String
    },
    price: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
})

const ProductModel = mongoose.model('products', userSchema)

module.exports = ProductModel