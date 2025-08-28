import express from 'express'
const router = express.Router();
import OrderModel from '../Models/Order.js';

router.post("/", async (req, res)=>{
      try {
    const order = new OrderModel(req.body); // save order with cart, user info
    await order.save();
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
})

export default router