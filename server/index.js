import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';



// const __filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);
const app=express();
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use(cors({ origin: true, credentials: true })); 
app.use(morgan("tiny"));
app.use(express.json());
const port=process.env.PORT;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
app.listen(port, () => console.log('Server listening on port 3000!'));
// Star.insertMany(wwestars);
//   Comment.insertMany((comments));
}).catch((error)=>console.log(`${error}: DB did not connect`));