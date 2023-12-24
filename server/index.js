import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { register } from './controllers/Auth';



const app=express();
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use(cors({ origin: true, credentials: true })); 
app.use(morgan("tiny"));
app.use(express.json());
app.post("/auth/register",upload.single('file'),register,(req,res)=>{
    console.log(req.file);
    console.log("file uploaded");
  });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  const upload = multer({ storage });
const port=process.env.PORT;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
app.listen(port, () => console.log('Server listening on port 3000!'));
// Star.insertMany(wwestars);
//   Comment.insertMany((comments));
}).catch((error)=>console.log(`${error}: DB did not connect`));