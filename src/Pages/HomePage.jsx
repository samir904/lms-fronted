import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { Link } from 'react-router-dom'

export default function HomePage() {
return (
    <HomeLayouts>
            <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]   ' >
                    <div className='w-1/2 space-y-6 ' >
                    <h1 className='text-5xl font-semibold ' >
                            Find out best
                            <span className='text-yellow-500 font-bold ' >
                                    Online Courses
                            </span>
                    </h1>
                    <p className='text-xl text-gray-200 ' >
                            We have a large library of courses taught by experienced instructors, covering a wide range of topics to help you achieve your learning goals.
                    </p>

                    <div className='space-x-6  ' >
                        <Link to="/courses" >
                        <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transtion-all ease-in-out ' >
                            Explore courses
                        </button>
                        </Link>
                        <Link to="/contact" >
                        <button className='border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transtion-all ease-in-out ' >
                            Contact Us
                        </button>
                        </Link>
                    </div>

                    </div>
                    <div className='w-1/2 flex items-center justify-center ' >
                    <img className='w-96' src="https://th.bing.com/th/id/OIP.PddMgtyqqu2RxrTuPYdW5wHaEK?pid=ImgDet&w=203&h=114&c=7&dpr=1.3" alt="homepage image" />
                    </div>
            </div>
    </HomeLayouts>
)
}
