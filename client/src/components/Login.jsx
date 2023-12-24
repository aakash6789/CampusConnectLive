import React, { useState } from 'react'

import {useForm} from 'react-hook-form';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const Login = () => {
  const {user,setUser,uname,setUname}=useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
      const { reset } = useForm();
      const formData={
        email:"",
        password:"",  
      }
      const [text,setText]=useState("");
      const navigate=useNavigate();
      const onError=()=>{
        console.log("enter again");
        setText("Some details are missing, please enter all the details");
      }
            const onSubmit=(data)=>{
               setText("");
             for(let prop in formData){
              // console.log(prop);
               formData[prop]=data[prop];
               }
              //  console.log(formData);
               callLog();
            }

            const callLog=async(req,res)=>{
              const formDataJson=JSON.stringify(formData);
               const savedUserResponse=await fetch(
                `${import.meta.env.VITE_API_SERVER_BASE_URL}/auth/login`,{
                  method:"POST",
                  headers:{
                    'Content-Type':'application/json'
                  },
                  credentials:'include',
                  body:formDataJson
                }
               ).then(async(res)=>{ 
                // const { token, user } = res.data;
                // console.log(token);
                if(res.status===200){
                  const data = await res.json(); // Parse the JSON response
                  const token = data.token; // Access the token property from the response data
                  const temp=data.findUser;
                 for(let prop in user){
                  // console.log(prop);
                 user[prop]= await data.findUser[prop];
                   }
                  //  console.log(user);
                // console.log(temp);
                // console.log(temp.phoneNo);
                //  await setUser({
                //   email: "bgjngr",
                //   firstName: temp.firstName,
                //   lastName:temp.lastName,
                //   phoneNo:temp.phoneNo
                //  });
                //  console.log(user);
                //  console.log(user.firstName);
                 setUname(user.firstName);
                // console.log('Token:', token);
                const userJSONString = JSON.stringify(user);
                 localStorage.setItem('jwt',`${token}`);
                 localStorage.setItem('user',`${userJSONString}`);
                   setText("Logged In");
                  navigate(-1);
                }
                else if(res.status===404){
                  setText("User does not exist");
                }
                else if(res.status===401){
                  setText("Invalid credentials.");
                }
                
              })
               .catch(err=>{
                 console.log("Error is:",err);
               })
            } 
  return (
    <div className=' md:h-[640px] xs:h-[532px]'>
             <h1 className='md:text-6xl mt-[20vh] font-bebasNeue   text-black  xs:text-4xl'>SIGN IN</h1>
        {/* <h1 className='text-6xl font-bebasNeue mt-[160px] ml-[660px] mr-[705px]'>SIGN UP</h1> */}
      <div className=' bg-white text-black md:w-[720px] md:h-[480px]  md:pt-[80px] md:mt-[40px] shadow-md  xs:h-[430px]'>
      <form action="" className='xs:mt-[30px] xs:pt-[30px] md:mt-[0px]' onSubmit={handleSubmit(onSubmit)}>
      <div className='md:text-left xs:text-center'>
            <label htmlFor="email" className='xs:text-left md:font-roboto md:ml-[31px] xs:mr-[340px]'>Email *</label>
            <br/>
            <input id='email' name='email' type='email' className='xs:w-[386px] xs:h-[54px] xs:mt-[5px] md:ml-[30px] border-[4px] md:w-[660px] rounded-md md:h-[48px] md:mt-[5px] md:p-2'  {...register("email",{
              required:true,
              minLength:4,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
            })}/>
            {errors.email && errors.email.type === "required" && (
            <p className="errorMsg text-red-500 md:ml-[30px] xs:mr-[260px] xs:w-[130px] xs:ml-[70px]">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg text-red-500 md:ml-[30px] xs:mr-[260px] ">Email is not valid.</p>
          )}
        </div>
        <div className='md:text-left xs:text-center mt-[30px]'>
            <label htmlFor="password" className='xs:text-left md:font-roboto md:ml-[31px] xs:mr-[310px]'>Password *</label>
            <br/>
            <input id='password' name='password' type='password' className='xs:w-[386px] xs:h-[54px] xs:mt-[5px] md:ml-[30px] border-[4px] md:w-[660px] rounded-md md:h-[48px] md:mt-[5px] md:p-2'  {...register("password",{
              required:true,
              minLength:4
            })}/>
            {errors.password && errors.password.type === "required" && (
            <p className="errorMsg text-red-500 ml-[68px] xs:mr-[262px] xs:w-[160px]">Password is required.</p>
          )}
            {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg text-red-500 ml-[30px] xs:mr-[120px]">
              Password should be at-least 6 characters.
            </p>
          )}
        </div>
    
        <p className='md:ml-[200px] md:pl-[6px] md:mt-[15px] md:mr-[200px] xs:mt-[50px] xs:ml-[110px] xs:mr-[135px] text-[1em]'>Don't have an account? <NavLink to='/register' className='text-blue-400' >Register </NavLink> instead</p>
        {text && (<p className='text-red-500 text-center pt-[20px]'>{text}</p>)}
        <button type="submit" className='bg-black text-white md:mt-[25px] md:w-[660px]  p-[0.45rem] font-bebasNeue hover:bg-black hover:text-yellow-200 xs:mt-[20px] xs:w-[386px] xs:mb-[20px]'>Sign in</button>
      </form>
      </div>
    </div>
  )
}

export default Login;