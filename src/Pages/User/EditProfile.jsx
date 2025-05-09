import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import toastStyles from '../../Helper/Toaststyle';
import { getUserdata, updateProfile } from '../../Redux/Slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayouts from '../../Layouts/HomeLayouts';
import PersonIcon from '@mui/icons-material/Person';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
export default function EditProfile() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[data,setdata]=useState({
        previewImage:"",
        fullName:"",
        avatar:undefined,
        userId:useSelector((state)=>state?.auth?.data?._id)
    })
    function handleimageupload(e){
        e.preventDefault();
        const uploadedimage=e.target.files[0];
        if(uploadedimage){
            const filereader=new FileReader();
            filereader.readAsDataURL(uploadedimage)
            filereader.addEventListener("load",function(){
                setdata({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadedimage
                })
            })
        }
    }
    function handleuserinputchange(e){
        const{name,value}=e.target;
        setdata({
            ...data,
            [name]:value
        })
    }
  async  function onformsubmit(e){
    console.log(data)
        e.preventDefault();
        if(!data.fullName||!data.avatar){
            toast.error("All fields are mandatory",toastStyles.error)
        }
        if(data.fullName.length<5){
            toast.error("name cannot be of less than 5 cahracters ",toastStyles.error)
        }
        const formdata=new FormData();
        formdata.append("fullName",data.fullName);
        formdata.append("avatar",data.avatar);
        console.log(formdata.entries().next)//debugging wht is in form data
        await dispatch(updateProfile(formdata))//[data.userid,formdata]

        await dispatch(getUserdata())
        navigate("/user/profile")
    }
  return (
    <HomeLayouts>
        <div className='flex  items-center justify-center h-[100vh]' >
            <form
            className='flex p-4 flex-col justify-center gap-5 rounded-lg text-white w-80 min-h-[26rem] shadow-[0_0_10px_black] '
            onSubmit={onformsubmit}
             action="">
                <h1 className='text-center tex-2xl font-semibold ' >
                    Edit profile
                </h1>
                <label 
                className='w-28 h-28 cursor-pointer rounded-full m-auto'
                htmlFor="image_uploads">
                    {data.previewImage?(
                        <img 
                        className='w-28 h-28 rounded-full m-auto'
                         src={data.previewImage} alt="" />
                    ):(
                        <PersonIcon className='w-28 h-28 rounded-full m-auto'style={{ width: '96px', height: '96px',margin:"auto"}} />
                    )}
                </label>
                <input
                accept='.jpg,.png,.svg,.jpeg'
                name='image_uploads'
                id='image_uploads'
                className='hidden'
                onChange={handleimageupload}
                 type="file" />
                 <div className='flex flex-col gap-1' >
                    <label
                    className='text-lg font-semibold'
                     htmlFor="fullName">
                         Name
                     </label>
                     <input 
                     required
                     name='fullName'
                     id='fullName'
                     value={data.fullName}
                     placeholder='Enter your name'
                     className='bg-transparent px-2 py-1 border'
                     type="text"
                     onChange={handleuserinputchange} />
                 </div>
                 <button 
                 type='submit'
                 className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounde-sm py-2 text-lg' >
                    Update profile
                 </button>
                 <Link to="/user/profile" >
                        <p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-2' >
                           <ArrowCircleLeftOutlinedIcon/> Go back to profile
                        </p>
                 </Link>
             </form>
        </div>
    </HomeLayouts>
  )
}
