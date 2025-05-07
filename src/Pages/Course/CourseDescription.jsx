import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HomeLayouts from '../../Layouts/HomeLayouts';
import { useSelector } from 'react-redux';

export default function CourseDescription() {
    const {state}=useLocation();

    const {role,data}=useSelector((state)=>state.auth)

    // useEffect(()=>{
    //     //console.log(locator)//debugging what is coming from locator object on page load
    // },[])
  return (
    <HomeLayouts>
        <div className='min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white ' >
            <div className='grid grid-cols-2 gap-10 py-10 relative' >
                <div className='space-y-5' >
                    <img 
                    className='w-full h-64 '
                    src={state?.thumbnail?.secure_url} alt="thumbnail" />
                    <div className='space-y-4' >
                    <div className='flex flex-col items-center justify-between text-xl  ' >
                        <p className='font-semibold'>
                            <span className='text-yellow-500 font-bold ' >
                                Total lectures : {" "}
                            </span>
                            {state?.numbersOfLectures}
                        </p>
                        <p className='font-semibold'>
                            <span className='text-yellow-500 font-bold ' >
                                Instructor : {" "}
                            </span>
                            {state?.createdBy}
                        </p>
                    </div>
                    {
                        role==="ADMIN" || data?.subscription?.status==="active"?(
                            <button className='cursor-pointer bg-yellow-600 text-xl rounded-md  font-bold px-5 py-3 w-full transition-all hover:bg-yellow-500 ease-in-out ' >
                                Watch lectures
                            </button>
                        ):(
                            <button className='cursor-pointer bg-yellow-600 text-xl rounded-md  font-bold px-5 py-3 w-full transition-all hover:bg-yellow-500 ease-in-out ' >
                                Subscribe 
                            </button>
                        )
                    }
                    </div>
                </div>
                <div className='space-y-2 text-xl' >
                    <h1 className='text-3xl font-bold text-yellow-500 mb-5 text-center' >
                        {state?.title}
                    </h1>
                    <p className='text-yellow-500' >
                        Course description:
                    </p>
                    <p>
                        {state?.description}
                    </p>
                </div>
            </div>
        </div>
    </HomeLayouts>
  )
}
