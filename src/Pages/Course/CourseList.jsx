import React, { useEffect } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllcourse } from '../../Redux/Slices/CourseSlice';
import CourseCard from '../../Components/CourseCard';

export default function CourseList() {
    const dispatch=useDispatch();
    const {courseData}=useSelector((state)=>state.course)

    async function loadCourse(){
        await dispatch(getAllcourse());
    }

    useEffect(()=>{//this useeffect will load the coursedata on first load of this component
        loadCourse();
    },[])
  return (
    <HomeLayouts>
        <div className='min-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white ' >
            <h1 className='text-center text-3xl font-semibold mb-5  ' >
                Explore the course made by <span className='font-bold text-yellow-500' >Industry expert</span>
            </h1>
            <div className='mb-10 flex flex-wrap gap-14 ' >
                {courseData?.map((element)=>{
                    return <CourseCard key={element._id} data={element}  />
                })}
            </div>
        </div>
    </HomeLayouts>
  )
}
