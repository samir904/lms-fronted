import { name } from 'ejs';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import toastStyles from '../../Helper/Toaststyle';
import { createNewCourse } from '../../Redux/Slices/CourseSlice';
import HomeLayouts from '../../Layouts/HomeLayouts';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
export default function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setuserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    })

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load", function () {
                setuserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }
    }

    function handleuserinput(e) {
        const { name, value } = e.target;
        setuserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onformsubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.thumbnail) {
            toast.error("All fields are required", toastStyles.error)
            return;
        }
        const response = await dispatch(createNewCourse(userInput));
        if (response?.payload?.success) {
            setuserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            })
            navigate("/courses")
        }

    }

    return (
        <HomeLayouts>

            <div className='flex items-center justify-center h-[100vh] ' >
            <form 
            className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative '
            onSubmit={onformsubmit} >
                <Link className='absolute top-4 text-2xl link text-accent cursor-pointer ' >
                <ArrowCircleLeftOutlinedIcon/>
                </Link>
                <h1 className='text-center text-2xl font-bold' >
                    Create new course
                </h1>
                <main className='grid grid-cols-2 gap-x-10 ' >
                    <div className='gap-y-6' >
                        <div>
                            <label 
                            className='cursor-pointer'
                            htmlFor="image_uploads">
                                {
                                    userInput.previewImage?(
                                        <img 
                                        className='w-full h-44 m-auto  border '
                                         src={userInput.previewImage} alt="" />
                                    ):(
                                        <div className='w-full h-44 m-auto flex items-center justify-center border '  >
                                           <h1 className='font-bold text-lg ' > Upload your course thumbnail</h1>
                                        </div>
                                    )
                                }
                            </label>
                            <input
                            id='image_uploads'
                            className='hidden'
                             type="file"
                             accept='.jpg,.jpeg,.png'
                             name='image_uploads'
                             onChange={handleImageUpload} />
                        </div>
                        <div className='flex flex-col gap-1' >
                            <label
                             className='text-lg font-semibold '
                             htmlFor="title">
                                Course title
                            </label>
                            <input
                            onChange={handleuserinput}
                            value={userInput.title}
                            className='bg-transparent px-2 py-1 border '
                            placeholder='Enter course title'
                            id='title'
                            name='title'
                            required
                             type="text" />

                        </div>
                    </div>
                    <div className='flex flex-col gap-1  ' >
                    <div className='flex flex-col gap-1' >
                            <label
                             className='text-lg font-semibold '
                             htmlFor="createdBy">
                                Instructor
                            </label>
                            <input
                            onChange={handleuserinput}
                            value={userInput.createdBy}
                            className='bg-transparent px-2 py-1 border '
                            placeholder='Enter course instructor'
                            id='createdBy'
                            name='createdBy'
                            required
                             type="text" />

                        </div>
                        <div className='flex flex-col gap-1' >
                            <label
                             className='text-lg font-semibold '
                             htmlFor="category">
                                Category
                            </label>
                            <input
                            onChange={handleuserinput}
                            value={userInput.category}
                            className='bg-transparent px-2 py-1 border '
                            placeholder='Enter course category'
                            id='category'
                            name='category'
                            required
                             type="text" />

                        </div>
                        <div className='flex flex-col gap-1' >
                            <label
                             className='text-lg font-semibold '
                             htmlFor="description">
                                Description
                            </label>
                            <textarea
                            onChange={handleuserinput}
                            value={userInput.description}
                            className='bg-transparent h-24 overflow-y-scroll resize-none px-2 py-1 border '
                            placeholder='Enter course description'
                            id='description'
                            name='description'
                            required
                             type="text" />

                        </div>
                    </div>
                </main>
                <button
                className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 rounded-sm font-semibold text-lg cursor-pointer ' 
                type='submit' >
                    Create course
                </button>

            </form>
            </div>

        </HomeLayouts>
    )
}
