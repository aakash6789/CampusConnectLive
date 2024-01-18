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
const io = new Server(3001,{cors:true,});
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
// const emailToSocketIdMap=new Map();
// const socketIdToEmailMap= new Map();

// io.on("connection",(socket)=>{
//   console.log('New connection');
//   //  socket.on("join-room",(data)=>{
//   //   const {roomId,emailId}=data;  
//   //   socket.join(roomId);
//   //   emailToSocketMapping.set(emailId,socket.id);
//   //   socketToEmailMapping.set(socket.id,emailId);
//   //   socket.emit("joined-room",{roomId});
//   //   console.log("User",emailId,"has joined room- ",roomId);
//   //   socket.broadcast.to(roomId).emit('user-joined',{emailId});
//   //  });
//   //  socket.on("call-user",(data)=>{
//   //   const {emailId,offer}=data;
//   //   const socketId=emailToSocketMapping.get(emailId);
//   //   const fromEmail=socketToEmailMapping.get(socket.id);
//   //   console.log(emailToSocketMapping);
//   //   console.log(socketToEmailMapping);
//   //   console.log(socketId);
//   //   console.log(fromEmail);
//   //   socket.to(socketId).emit("incoming-call",{from:fromEmail,offer});
//   //  })
//   //  socket.on("call-accepted",(data)=>{
//   //   console.log("call accepted ??");
//   //   const {emailId,ans}=data;
//   //   const socketId=emailToSocketMapping.get(emailId);
//   //   socket.to(socketId).emit('call-accepted',{ans});
//   //  })
//   socket.on("room:join",(data)=>{
//     const {email,roomId}=data;
//    console.log(data);
//    emailToSocketIdMap.set(email,socket.id);
//    socketIdToEmailMap.set(socket.id,email);
//    io.to(roomId).emit("user:joined",{email,id:socket.id});
//    socket.join(roomId);
//    io.to(socket.id).emit("room:join",data);
//   });

//   socket.on("user:call",({to,offer})=>{
//       io.to(to).emit("incoming:call",{from:socket.id,offer});
//   })

// })


const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
mongoose.connect(process.env.MONGO_URL,{
}).then(()=>{
app.listen(port, () => console.log('Server listening on port 3000!'));
}).catch((error)=>console.log(`${error}: DB did not connect`));
// io.listen(3001);