import mongoose from 'mongoose';

let productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productImage:String
})

let productModel =  mongoose.model("ProductCart", productSchema)

export default productModel;