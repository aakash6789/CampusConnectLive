import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import { register } from './controllers/Auth.js';
import authRoutes from './routes/RegisterAuth.js'
import { Server } from 'socket.io';
import * as http from 'http'
const app=express();
const io = new Server({cors:true});
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use(cors({ origin: true, credentials: true })); 
app.use(morgan("tiny"));
app.use(express.json());
const port=process.env.PORT;
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
const emailToSocketMapping=new Map();

io.on("connection",(socket)=>{
  console.log('New connection');
   socket.on("join-room",(data)=>{
    const {roomId,emailId}=data;  
    socket.join(roomId);
    emailToSocketMapping.set(emailId,socket.id);
    socket.emit("joined-room",{roomId});
    console.log("User",emailId,"has joined room- ",roomId);
    socket.broadcast.to(roomId).emit('user-joined',{emailId});
   })

})
mongoose.connect(process.env.MONGO_URL,{
}).then(()=>{
app.listen(port, () => console.log('Server listening on port 3000!'));
}).catch((error)=>console.log(`${error}: DB did not connect`));
io.listen(3001);