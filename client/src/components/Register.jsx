import React, { useState } from 'react'

import {useForm,Controller} from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { number } from 'yup';


const Register = () => {
  const [text,setText]=useState("");
  const[flag,setFlag]=useState(0);
    const {
        register,
        handleSubmit,control,
        formState: { errors }
      } = useForm();
      const onSubmit=async(data,e)=>{
        e.preventDefault();
        const uniqueSuffix = Date.now() + '-';
        const formData = new FormData();
         setText("");
         data.file = e.target.file.files
    console.log(data);
    await formData.append('email',data.email);
    await formData.append('firstName',data.firstName);
    await formData.append('lastName',data.lastName);
    await formData.append('password',data.password);
    await formData.append('file', data.file[0]);
    await formData.append('picture',data.file[0].name);
        
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
        // console.log(formData);
         callReg(formData);

      }
      const onError=()=>{
        console.log("enter again");
        setText("Some details are missing, please enter all the details");
      }
      const callReg=async(formData)=>{
        // console.log(formData);
        const formDataJson=JSON.stringify(formData);
        // console.log(formData.picture[0].name);
        // console.log(typeof(formData.picture));
         const savedUserResponse=await fetch(
          `${import.meta.env.VITE_API_SERVER_BASE_URL}/auth/register`,{
            method:"POST",
            // headers:{
            //   'Content-Type':' multipart/form-data; boundary=MyBoundary'
            // },
            body:formData
          }
         ).then(res=>{
          if(res.status===201){
            setFlag(1);
          }
          if(res.status===409){
            setText("User already exists,try logging in");
          }
         })
         .catch(err=>{
           console.log("Error is:",err);
         })
      }

  return (
    <div>
      {flag===1?<Login/>:(
    <div className='md:h-[1300px] md:pt-[100px] text-white  xs:h-[1200px]'>
        <h1 className='md:text-8xl font-bebasNeue   text-black text-1xl md:mt-[0px] mt-[8vh]  '>SIGN UP</h1>
      
       
      <div className=' bg-white text-black md:w-[720px] md:h-[990px]  md:pt-[80px] md:mt-[40px] shadow-md  xs:h-[990px]'>
      <form action="" className='xs:mt-[30px] xs:pt-[30px] md:mt-[0px]' onSubmit={handleSubmit(onSubmit,onError)} encType='multipart/formData' >
      <div className='md:text-left xs:text-center'>
            <label htmlFor="email" className='xs:text-left font-roboto md:ml-[31px] xs:mr-[340px]'>Email *</label>
            <br/>
            <input id='email' name='email' type='email' className='xs:w-[386px] xs:h-[54px] xs:mt-[5px] md:ml-[30px] border-[4px] md:w-[660px] rounded-md md:h-[48px] md:mt-[5px] md:p-2'  {...register("email",{
              required:true,
              minLength:6,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
            })}/>
            {errors.email && errors.email.type === "required" && (
            <p className="errorMsg text-red-500 md:ml-[30px] xs:mr-[260px]">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg text-red-500 md:ml-[30px] xs:mr-[260px]">Email is not valid.</p>
          )}
        </div>
        <div className='md:text-left xs:text-center mt-[30px]'>
            <label htmlFor="name" className='xs:text-left font-roboto md:ml-[31px] xs:mr-[315px]'>First name</label>
            <br/>
            <input id='name' name='firstName' type='text' className='xs:w-[386px] xs:h-[54px] xs:mt-[5px] md:ml-[30px] border-[4px] md:w-[660px] rounded-md md:h-[48px] md:mt-[5px] md:p-2' {...register("firstName")}/>
        </div> 
        <div className='md:text-left xs:text-center mt-[30px]'>
            <label htmlFor="name" className='xs:text-left font-roboto md:ml-[31px] xs:mr-[315px]'>Last name</label>
            <br/>
            <input id='lastName' name='lastName' type='text' className='xs:w-[386px] xs:h-[54px] xs:mt-[5px] md:ml-[30px] border-[4px] md:w-[660px] rounded-md md:h-[48px] md:mt-[5px] md:p-2' {...register("lastName")}/>
        </div>
        
        <div className='md:text-left xs:text-center mt-[30px]'>
            <label htmlFor="password" className='xs:text-left font-roboto md:ml-[31px] xs:mr-[310px]'>Password *</label>
            <br/>
            <input id='password' name='password' type='password' className='xs:w-[386px] xs:h-[54px] xs:mt-[5px] md:ml-[30px] border-[4px] md:w-[660px] rounded-md md:h-[48px] md:mt-[5px] md:p-2'  {...register("password",{
              required:true,
              minLength:4
            })}/>
            {errors.password && errors.password.type === "required" && (
            <p className="errorMsg text-red-500 ml-[30px] xs:mr-[262px]">Password is required.</p>
          )}
            {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg text-red-500 md:ml-[32px]">
              Password should be at-least 6 characters.
            </p>
          )}
        </div>
        <div className='md:text-left xs:text-center mt-[30px] xs:mb-[10px]'>  
            <label htmlFor="phoneNo" className='xs:text-left font-roboto md:ml-[31px] xs:mr-[315px] '>Phone no</label>
             <br/>
            <input id='phoneNo' name='phoneNo' type='phone-no' className='xs:w-[386px] xs:h-[54px] xs:mt-[5px] md:ml-[30px] border-[4px] md:w-[660px] rounded-md md:h-[48px] md:mt-[5px] md:p-2'  {...register("phoneNo")}/>
        </div>

                  <div className='md:text-left xs:text-center mt-[30px] xs:mb-[10px] md:ml-[32px] md:mb-[10px] '>
                  <label htmlFor="picture" className='font-roboto  xs:mr-[280px]'>Profile Picture*</label>
                  <br/>
                    {/* <input type='file' name='picture' id='picture' className='xs:mr-[90px] xs:mt-[20px] xs:mb-[20px]' {...register("picture",{
              required:true
            })}></input> */}
            {/* <Controller
          name="picture"
          control={control}
          render={({ field }) => <input type="file" {...field} />}
        /> */}
        <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <input {...field} type="file" id="file" />
                )}
              />
             {errors.image && errors.image.type === "required" && (
            <p className="errorMsg text-red-500 ml-[30px] xs:mr-[262px]">Picture is required.</p>
          )}
          {/* <input type="file" name="file"></input> */}
                     </div>
        <div className='flex'>
        <input type="checkbox" id="consent_checkbox" name="consent_checkbox"  className='md:ml-[30px] mt-[20px] h-[20px] mt-[25vh] xs:ml-[65px] xs:mt-[5px]' 
        {...register("consent_checkbox",{
          required:true
        })}
        ></input>
        <label htmlFor='consent_checkbox'>
        <p className=' md:w-[660px] rounded-md mr-[5vw] md:h-[96px] md:mt-[5vh]  xs:h-[134px] '>
        I consent to receiving marketing communications from Wrestling World and its affiliates about special offers and other products or services based on my information and interests, including how I use and interact with the services, as described in the <a href='https://www.wwe.com/page/privacy-policy' target='_blank' className='text-blue-400'>Privacy Policy</a> . I can unsubscribe at any time using options available in the <a href='https://www.wwe.com/page/privacy-policy' target='_blank' className='text-blue-400'>Privacy Policy</a>.
        </p>
        </label>
        </div>
        <p className=' md:pl-[6px] md:mt-[15px] xs:mt-[15vh] '>Have an account? <NavLink to='/login' className='text-blue-400' >Login </NavLink> instead</p>
        {text && (<p className='text-red-500 text-center pt-[20px]'>{text}</p>)}
        <button type="submit" className='bg-black text-white md:mt-[25px] md:w-[660px]  p-[0.45rem] font-bebasNeue  hover:text-yellow-200 xs:mt-[20px]  xs:w-[386px] xs:mb-[20px]'>Sign up</button>
      </form>
      </div>
      </div>
      )}
    </div>
  )
}

export default Register;
//soon this will be complete