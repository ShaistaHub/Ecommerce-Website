import express, { urlencoded } from 'express'
import mongoose from 'mongoose';
let app = express();
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt, { compare } from "bcrypt"
import jwt from 'jsonwebtoken'
import crypto from  'crypto'
import { Certificate, hash } from 'crypto';
import productModel from './Models/ProductModel.js';
import User from './Models/Auth.js';
import cloudinary from './cloudinary.js';
app.use('/uploads', express.static('uploads')); // Serve uploaded files
import upload from './multer.js';
import { fileURLToPath } from 'url';
import path from 'path';
import router from './routes/orderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 3000


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongoDB is connected")
}).catch ((err)=>{
    console.log(`the error is ${err}`)
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/register', async (req, res) => {
      let {username, email, password} = req.body;
   let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
      let createUser = await User.create({
        username,
        email,
        password:hash
      })
      // 3. Generate token IMMEDIATELY after creation
     const token = jwt.sign(
  { id: createUser._id },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);
res.cookie("token", token, { httpOnly: true })
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: createUser._id, username: createUser.username, email: createUser.email },
        token, // optional if you also want to store in localStorage
      });
    })

    app.post("/api/login", async (req, res) => {
      let {email, password} = req.body;
      let findUser = await User.findOne({email})
        if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }
      console.log(findUser)
      const isPasswordValid = await bcrypt.compare(password, findUser.password)
        if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: findUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Login successful",
        user: { id: findUser._id, username: findUser.username, email: findUser.email },
        token,
      });
    })

app.post('/api/products', upload.single("image"), async (req, res)=>{
    try {
        let {name, price} = req.body;
         const file = req.file; 
        console.log("whole info",name, price, file)
        console.log('Uploaded file:', req.file);

        let result = await cloudinary.uploader.upload(req.file.path, {folder: "imagFolder"});
        let createCart = await productModel.create({
           productName: name,
           productPrice: price,
           productImage: result.secure_url
        })
        console.log("picture path",result.secure_url)
        res.json({ message: "API working!", data: createCart});
    }
    catch (err) {
     console.log(err)
    }
})

app.get('/api/products', async (req, res)=>{
  
     try {
    let fetchData = await productModel.find(); // Fetch all products
    console.log(fetchData); // Logs in the backend
    res.json(fetchData); // ✅ Send data to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
})

app.get('/api/products/search', async (req, res) => {
  try {
    const search = req.query.q || "";
    const fetchData = await productModel.find({
      productName: { $regex: search, $options: "i" }
    });
    res.json(fetchData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.use("/api/orders", router);

app.listen(port, (req, res)=>{
    console.log(`server is running on ${port}`)
})

