import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import toastStyles from '../Helper/Toaststyle'
import { login } from '../Redux/Slices/AuthSlice'

export default function Login() {
    const[logindata,setlogindata]=useState({
        email:"",
        password:""
    })
    const dispatch=useDispatch();
    const navigate=useNavigate();
    function handleuserInput(e){
        const{name,value}=e.target;
        setlogindata({
            ...logindata,
            [name]:value
        })
    }
  async  function onLogin(e){
        e.preventDefault();
        if(!logindata.email||!logindata.password){
            toast.error("All fields are required",toastStyles.error)
            return;
        }
        const response=await dispatch(login(logindata));
        if(response?.payload?.success){
            navigate("/");
        }
        setlogindata({
            email:"",
            password:""
        })

    }
  return (
    <HomeLayouts>
        <div className='flex items-center justify-center h-screen ' >
            <form onSubmit={onLogin}
            noValidate
            className='flex rounded-md flex-col  gap-2 shadow-[0_0_10px_black] p-4 py-6 w-96 '
            >
                <h1 className='text-2xl font-bold text-white text-center ' >
                    Login Form
                </h1>
                <div className='flex flex-col text-white  ' >
                <label
                className='font-semibold  '
                 htmlFor="email">
                    Email
                 </label>
                 <input 
                 required
                 onChange={handleuserInput}
                 value={logindata.email}
                 name='email'
                 placeholder='Enter your email ..'
                 className='bg-transparent border rounded-sm py-2  '
                 type="email"
                 id='email' />
                </div>
                <div className='flex flex-col text-white  ' >
                <label
                className='font-semibold  '
                 htmlFor="password">
                    Password
                 </label>
                 <input
                 id='password'
                 required 
                 onChange={handleuserInput}
                 name='password'
                 value={logindata.password}
                 placeholder='Enter your password ..'
                 className='bg-transparent rounded-sm border py-2  '
                 type="password" />
                </div>

                <button className='bg-yellow-600 cursor-pointer w-full mt-2 py-2 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300  ' >
                    Login
                </button>
                <p className='text-semibold text-md ' >
                    Dont't have an account ? <span className='link link-accent' ><Link to="/signup" >Signup</Link></span>
                </p>
            </form>

        </div>
    </HomeLayouts>
  )
}
