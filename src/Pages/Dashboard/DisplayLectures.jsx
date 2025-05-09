import React, { useEffect, useState } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { data, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseLectures, getCourseLectures } from '../../Redux/Slices/LectureSlice';

export default function DisplayLectures() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {state}=useLocation();
    const {lectures}=useSelector((state)=>state.lecture)
    const {role}=useSelector((state)=>state.auth)

    const[currvideo,setcurrvideo]=useState(0);

   async function onLectureDelete(courseId,lectureId){
        console.log(courseId,lectureId)
        await dispatch(deleteCourseLectures({courseId:courseId,lectureId:lectureId}))
        await dispatch(getCourseLectures(state._id));
    }

    useEffect(()=>{
        console.log(state)//debug
        if(!state)navigate("/course")
            if(!state){
                navigate("/courses")
            }
            dispatch(getCourseLectures(state._id))
            console.log(lectures)
            console.log(role)
    },[])
  return (
    <HomeLayouts>
          <div className='flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]' >
              <div className='text-center text-2xl font-semibold text-yellow-500' >
                  Course name :{state?.title}
              
              </div>
              { (lectures&&lectures.length>0)?( <div className='flex justify-center gap-10 w-full' >
                  {/*left section for playing vidos and displaying course details to admin */ }
                  <div className='space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] ' >
                    <video 
                    disablePictureInPicture
                    muted
                    controlsList='nodownload'
                    controls
                    className='object-fill rounded-tl-lg rounded-tr-lg w-full'
                    src={lectures&&lectures[currvideo]?.lecture?.secure_url}></video>
                    <div>
                      <h1>
                        <span className='text-yellow-500' > Title:{" "}
                          
                        </span>
                        {lectures&&lectures[currvideo]?.title}
                      </h1>
                      <p>
                        <span className='text-yellow-500 line-clamp-4' >
                          Description:{" "}
                        </span>
                        {lectures&&lectures[currvideo]?.description}
                      </p>
                    </div>
                  </div>
                  {/*right section for dispalying list of lecture*/ }
                    <ul className='w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 ' >
                      <li className='font-semibold text-xl  text-yellow-500 flex items-center justify-between ' >
                        <p>
                          Lectures list</p>
                          {role==="ADMIN"&&(
                            <button onClick={()=>navigate("/course/addlecture",{state:{...state}})} className='btn  btn-primary px-2 py-1 rounded-md font-semibold text-sm ' >
                              Add new lecture
                            </button>
                          )}
                        
                      </li>
                      {lectures&&
                      lectures.map((lecture,idx)=>{
                        return(
                          <li key={lecture._id} 
                          className='space-y-2' >
                              <p className='cursor-pointer' onClick={()=>setcurrvideo(idx)} >
                                  <span>
                                    {" "} lecture {idx+1} :{" "}
                                  </span>
                                  {lecture.title}
                              </p>
                              {role==="ADMIN"&&(
                            <button onClick={()=>onLectureDelete(state?._id,lecture?._id)} className='btn btn-accent px-2 py-1 rounded-md font-semibold text-sm ' >
                              Delete lecture
                            </button>
                          )}
                          </li>
                        )
                      })
                        
                      }
                    </ul>
              </div>):(
                <div>
                  { role==="ADMIN"&&(
                            <button onClick={()=>navigate("/course/addlecture",{state:{...state}})} className='btn  btn-primary px-2 py-1 rounded-md font-semibold text-sm ' >
                              Add new lecture
                            </button>
                          )}
                </div>
              )}
             
          </div>
    </HomeLayouts>
  )
}
