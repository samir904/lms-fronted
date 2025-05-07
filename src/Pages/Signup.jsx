import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast"
import toastStyles from '../Helper/Toaststyle';
import {createAccount} from "../Redux/Slices/AuthSlice.js"
export default function Signup() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[previewImage,setPreviewImage]=useState("");

    const [signupData,setsignupdata]=useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    })

    function handleUserInput(e){
        const{name,value}=e.target;
        setsignupdata({
            ...signupData,
            [name]:value
        })
    }
    function getImage(event){
        event.preventDefault();
        //getting the image
        const uploadedImage=event.target.files[0]

        if(uploadedImage){
            setsignupdata({
                ...signupData,
                avatar:uploadedImage
            });
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setPreviewImage(this.result)
            })
        }
    }

 async   function creteNewAccount(e){
        e.preventDefault();
    if(!signupData.email|| !signupData.password|| !signupData.fullName ||!signupData.avatar ){
        toast.error("All fields are required",toastStyles.error)
        
        return;
    }
    //checking name field length
    if(signupData.fullName.length<5){
        toast.error("Name should be atleast 5 character",toastStyles.error)}
        if(!signupData.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            toast.error("Invalid email id")
            return;
          }
          if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
)){
    toast.error("Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character",toastStyles.error)
    return;
}
    const formData=new FormData();
    formData.append("fullName",signupData.fullName)
    formData.append("email",signupData.email)
    formData.append("password",signupData.password)
    formData.append("avatar",signupData.avatar)
        
    //dispatch create account action
    const response=await dispatch(createAccount(formData));
    console.log(response)
    if(response?.payload?.success)
    navigate("/");
    setsignupdata({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    })
    setPreviewImage("");
    
    }

  return (
    <HomeLayouts>
        <div className='flex items-center justify-center h-[100vh] ' >
            <form 
            onSubmit={creteNewAccount}
             noValidate
            className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] '
            >
            <h1 className='text-center text-2xl font-bold ' >
                Registration Page
            </h1>
            <label  htmlFor="image_uploads">
                {previewImage?(
                    <img src={previewImage} className='w-24 h-24 rounded-full m-auto justify-center cursor-pointer ' alt="" />
                ):(
                    <AccountCircleIcon className='w-24 h-24 rounded-full m-auto justify-center cursor-pointer ' style={{ width: '96px', height: '96px', marginLeft: "120px" }} />
                )}
            </label>
            <input 
            onChange={getImage}
            id='image_uploads'
            className='hidden  '
            type="file"
            accept='.jpg,.jpeg,.png,.svg'
            name='image_uploads' />
            <div className='flex flex-col gap-1' >
                
                <label
                className='font-semibold'
                 htmlFor="fullName">
                   Name
                 </label>
                 <input 
                 value={signupData.fullName}
                 onChange={handleUserInput}
                 id='fullName'
                 required
                 placeholder='Enter your name ..'
                 name='fullName'
                 className='bg-transparent px-2 py-2 border '
                 type="text" />
                 </div>
            <div className='flex flex-col gap-1' >
                
                 <label
                 className='font-semibold'
                  htmlFor="email">
                    Email
                  </label>
                  <input 
                  onChange={handleUserInput}
                  value={signupData.email}
                  id='email'
                  required
                  placeholder='Enter your Email ..'
                  name='email'
                  className='bg-transparent px-2 py-2 border '
                  type="email" />
                  </div>
                  <div className='flex flex-col gap-1'>
                 <label
                 className='font-semibold'
                  htmlFor="password">
                    Password
                  </label>
                  <input 
                  onChange={handleUserInput}
                  value={signupData.password}
                  id='password'
                  required
                  placeholder='Enter your password ..'
                  name='password'
                  className='bg-transparent px-2 py-2 border '
                  type="password" />
                  </div>
            
            <button type='submit' className=' mt-2 hover:bg-amber-500 transition-all ease-in-out rounded-sm duration-300 py-2 font-semibold text-lg cursor-pointer  w-full bg-yellow-600' >
                Create account
            </button>
            <p>
                Already have an account ? <Link to="/login"className='link text-accent cursor-pointer' >Login</Link>
            </p>
            </form>
        </div>
    </HomeLayouts>
  )
}
