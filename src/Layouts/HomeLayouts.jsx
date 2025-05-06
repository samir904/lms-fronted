import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import {Link, useNavigate} from "react-router-dom"
import Footer from "../Components/Footer.jsx"
import {useDispatch, useSelector} from "react-redux"

export default function HomeLayouts({children}) {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  //for checking if user is logged in 

  const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn);

  //for displaying the options

  const role=useSelector((state)=>state?.auth?.role);

  async function handleLogout(e){
    e.preventDefault();

   // const res=await dispatch(logout())
   //if(res?.payload?.success)
   navigate("/")
  }

  function changewidth() {
    const drawerside = document.getElementsByClassName("drawer-side");
    drawerside[0].style.width = 'auto';
  }

  function hidedrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    const drawerside = document.getElementsByClassName("drawer-side");
    drawerside[0].style.width = '0';
  }

  return (
    <div className='min-h-[90vh] '>
      <div className='drawer absolute left-0 z-50 w-fit'>
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className='drawer-content'>
          <label
            className='cursor-pointer relative'
            htmlFor="my-drawer"
          >
            <MenuIcon
              fontSize='large'
              className='font-bold text-white m-4'
              onClick={changewidth}
            />
          </label>
        </div>
        <div className='drawer-side w-0'>
          <label className='drawer-overlay' htmlFor="my-drawer"></label>
          <ul className='menu p-4  h-[100%] w-64 sm:w-80 bg-base-200 text-base-content'>
            <li className='w-fit absolute right-2 z-50'>
              <button onClick={hidedrawer}>
                <CancelIcon fontSize='medium' />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn&&role==="ADMIN"&&(
              <li>
                <Link to="/admin/dashboard" >Admin/dashboard</Link>
              </li>
            )}

            <li>
              <Link to="/courses">All courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            {
              !isLoggedIn &&(
                <li className='absolute bottom-4 w-full' >
                <div className='w-[95%] flex items-center justify-center  ' >
                    <button className=' btn btn-soft btn-primary  px-2 py-1 font-semibold rounded-md w-1/2 gap-2' >
                        <Link to="/login" >Login</Link>
                    </button>
                    <button className='btn  btn-soft btn-secondary px-2 py-1 font-semibold rounded-md w-1/2 gap-2' >
                        <Link to="/signup" >Signup</Link>
                    </button>
                </div>
                </li>
              )
            }
            {
              isLoggedIn &&(
                <li className='absolute bottom-4 w-full' >
                <div className='w-full flex items-center justify-center  ' >
                    <button className='btn btn-primary  px-4 py-1 font-semibold rounded-md w-full ' >
                        <Link to="/user/profile" >Profile</Link>
                    </button>
                    <button className='btn btn-secondary px-4 py-1 font-semibold rounded-md w-full ' >
                        <Link onClick={handleLogout} >Logout</Link>
                    </button>
                </div>
                </li>
              )
            }
          </ul>
        </div>
      </div>
      <div>
        {children}
      <Footer />
      </div>
    </div>
  )
}