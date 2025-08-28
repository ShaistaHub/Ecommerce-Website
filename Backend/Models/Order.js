import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: Number,
    paymentMethod:String
});

let OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel