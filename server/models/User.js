import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:"true",
        unique:"true",
        max:50
    },
    firstName:{
        type:String,
        required:"true",
        min:2,
        max:50
    },
    lastName:{
        type:String,
        required:"true",
        min:2,
        max:50
    },
    password:{
        type:String,
        required:"true",
        min:5
    },
   phoneNo:{
    type:Number,
   },
   picture:{
    type:String
   }
})
const User=mongoose.model("User",userSchema);
export default User;