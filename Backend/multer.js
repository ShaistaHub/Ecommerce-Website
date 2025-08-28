import multer from "multer";
import crypto from 'crypto';
import path from "path";


let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
       cb(null, "Upload/Image")
    },
    filename: (req, file, cb) =>{
        let randomFile = crypto.randomBytes(6).toString("hex");
        cb(null, randomFile + path.extname(file.originalname));
    }
})

let upload = multer({storage})

export default upload;