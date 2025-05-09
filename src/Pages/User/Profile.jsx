import React, { useEffect } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { cancelCourseBUndle } from '../../Redux/Slices/RazorpaySlice';
import { getUserdata } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
import toastStyles from '../../Helper/Toaststyle';

export default function Profile() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=useSelector((state)=>state?.auth?.data);

    async function handleCancellation() {
        toast("Initiating cancellation",toastStyles.info)
        await dispatch(cancelCourseBUndle())
        await dispatch(getUserdata());
        toast.success("cancellation completed",toastStyles.success)
        navigate("/")
    }
    useEffect(() => {
        async function fetchUserData() {
            await dispatch(getUserdata());
        }
        fetchUserData();
    }, [dispatch]);

  return (
    <HomeLayouts>
        <div className=' min-h-[90vh] flex items-center justify-center ' >
            <div className='my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]' >
                <img
                className='w-40 m-auto rounded-full border border-black  '
                 src={userData?.avatar?.secure_url} 
                 alt="profile photo" />
                 <h3 className='text-xl font-semibold text-center capitalize ' >
                        {userData?.fullName}
                 </h3>
                 <div className='grid grid-cols-2 ' >
                    <p>Email:</p> <p>{userData?.email}</p>
                    
                    
                    <p>Role:</p><p>{userData?.role}</p>
                    
                    
                    <p>Subscription: </p>
                    <p>{
                        userData?.subscription?.status==="active" ?"Active" :"Inactive"
                        }</p>
                 </div>
                 <div className='flex items-center justify-between gap-2' >
                        <Link
                         to="/changepassword" 
                        className=' w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out  duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center' >
                            Change password
                        </Link>
                        <Link
                         to="/user/editprofile" 
                        className=' w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out  duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center' >
                            Edit profile
                        </Link>
                 </div>
                 {
                    userData?.subscription?.status==="active" &&(
                        <button 
                        onClick={handleCancellation}
                         className='w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out  duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center ' >
                            Cancel Subscription
                        </button>
                    )
                 }
            </div>
        </div>
    </HomeLayouts>
  )
}
