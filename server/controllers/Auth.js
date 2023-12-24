import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from "multer";


const register=async(req,res)=>{
    const saltRounds=10;
    try{
    // const parsedData=JSON.parse(req.body);
    // console.log(req.body);
  const {email,firstName,lastName,password,phoneNo,picture}=req.body;
  // console.log(firstName);
  // console.log(file);
  
  const findUser=await User.findOne({email});
  if(findUser){
    res.status(409).send("User already exists");
    console.log("User already exists");
  }else{
  const encPassword=await bcrypt.hash(password,10);
  const newUser=await User.create({
    email,
    firstName,
    lastName,
    password:encPassword,
    phoneNo,
    picture
  }) .then(() => {
    res.status(201).send("User added successfully");
    console.log("User added successfully");
  })
    }
  }

catch(err){
    res.status(404).json({message:err.message});
}
}
const login=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const findUser=await User.findOne({email});
    if(!findUser){
      console.log('User does not exist');
      return res.status(404).send("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {return res.status(401).json({ msg: "Invalid credentials." });}
    findUser.password=undefined;
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET); 
    // res.cookie('jwt', token, {  
    //   httpOnly: true,
    //   maxAge: 3 * 24 * 60 * 60 * 1000,
    //   domain:'http://localhost:5173',
    //   path:'/login'
    // });
    res.cookie('newCookie', 'cookieValue', { maxAge: 86400000 });
    res.status(200).json({token,findUser}); 
    
  }catch(err){
    res.status(404).json({message:err.message});
}
}

export {register,login};