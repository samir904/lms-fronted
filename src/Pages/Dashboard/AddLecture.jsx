import React, { useEffect, useState } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import toastStyles from '../../Helper/Toaststyle';
import { addCourseLectures } from '../../Redux/Slices/LectureSlice';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
export default function AddLecture() {
    const coursedetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setuserInput] = useState({
        id: coursedetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target
        setuserInput({
            ...userInput,
            [name]: value
        })
    }
    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log(source)
        setuserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })

        
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.lecture || !userInput.title || !userInput.description) {
            toast.error("All fields are required", toastStyles.error)
            return
        }
        const response = await dispatch(addCourseLectures(userInput));
        if (response?.payload?.success) {
            navigate(-1);
            setuserInput({
                id: coursedetails.id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
    }
    useEffect(()=>{
        console.log(coursedetails)
        if(!coursedetails)navigate("/courses")
    })

    return (
        <HomeLayouts>
                <div className='min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16   ' >
                    <div className='flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg ' >
                        <header className='flex items-center justify-center relative    ' >
                            <button
                            onClick={()=>navigate(-1)}
                             className='absolute left-2 text-xl text-green-500  ' >
                                <ArrowCircleLeftOutlinedIcon/>
                            </button>
                            <h1 className='text-xl text-yellow-500 font-semibold  ' >

                                Add new lecture
                            </h1>
                        </header>
                        <form 
                        className='flex flex-col gap-3 '
                         onSubmit={onFormSubmit}>
                            <input
                            value={userInput.title}
                            name='title'
                            placeholder='Enter the title of lecture'
                            onChange={handleInputChange}
                            className='bg-transparent px-3 py-1 border '
                             type="text" />
                             <textarea
                            value={userInput.description}
                            name='description'
                            placeholder='Enter the description of lecture'
                            onChange={handleInputChange}
                            className='bg-transparent px-3 resize-none overflow-y-scroll h-36 py-1 border '
                             type="text" />
                             {userInput.videoSrc?(
                                <video
                                muted
                                 controls
                                 controlsList='nodownload nofullscreen'
                                 disablePictureInPicture
                                 className='object-fill rounded-tl-lg rounded-tr-lg w-full '
                                 src={userInput.videoSrc}
                                 ></video>
                             ):(
                                <div className='h-48 border flex items-center  justify-center cursor-pointer ' >
                                    <label
                                    className='font-semibold text-xl cursor-pointer '
                                     htmlFor="lecture">
                                        Choose your video
                                     </label>
                                     <input
                                     accept='video/mp4 video/x-mp4 video/*'
                                     onChange={handleVideo}
                                     
                                     name='lecture'
                                     id='lecture'
                                     className='hidden  '
                                      type="file" />
                                </div>
                             )}
                             <button 
                             type='submit'
                              className='btn btn-primary py-1 font-semibold text-lg  ' >
                                Add new lecture
                             </button>
                         </form>
                    </div>
                </div>
        </HomeLayouts>
    )
}
