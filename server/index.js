import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import { register } from './controllers/Auth.js';
import authRoutes from './routes/RegisterAuth.js'
import { Server as SocketIO } from 'socket.io';
import * as http from 'http'


const app=express();
const server = http.createServer(app);
const io = new SocketIO(server);
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use(cors({ origin: true, credentials: true })); 
app.use(morgan("tiny"));
app.use(express.json());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.use('/auth',authRoutes);
app.post("/auth/register",upload.single('file'),register,(req,res)=>{
    console.log(req.file);
    console.log("file uploaded");
  });

const port=process.env.PORT;
mongoose.connect(process.env.MONGO_URL,{
}).then(()=>{
server.listen(port, () => console.log('Server listening on port 3000!'));
}).catch((error)=>console.log(`${error}: DB did not connect`));