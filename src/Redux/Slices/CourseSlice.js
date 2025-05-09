import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstace"
import toastStyles from "../../Helper/Toaststyle"

const initialState={
    courseData:[]
}

export const getAllcourse=createAsyncThunk("/course/get",async()=>{
    try{
        const res=axiosInstance.get("/courses");
        toast.promise(res,{
            loading:"Loading course data",
            success:"course loaded successfully",
            error:"failed to load the course"
        },{
            loading:toastStyles.loading,
            success:toastStyles.success,
            error:toastStyles.error
        })

        return (await res).data.courses;

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

export const deleteCourse=createAsyncThunk("/course/get",async(id)=>{
    try{
        const res=axiosInstance.delete("/courses");
        toast.promise(res,{
            loading:"deleting course ",
            success:"course deleted successfully",
            error:"failed to delete the course"
        },{
            loading:toastStyles.loading,
            success:toastStyles.success,
            error:toastStyles.error
        })

        return (await res).data.courses;

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

export const createNewCourse=createAsyncThunk("/course/create",async(data)=>{
    try{
        let formdata=new FormData();
        formdata.append("title",data.title)
        formdata.append("description",data.description)
        formdata.append("category",data.category)
        formdata.append("createdBy",data.createdBy)
        formdata.append("thumbnail",data.thumbnail)

        const res=axiosInstance.post("/courses",formdata)
        toast.promise(res,{
            loading:"Creating your Course",
            success:"Course created successfully",
            error:"failed to create course"
        });

        return (await res).data;

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllcourse.fulfilled,(state,action)=>{
            if(action?.payload){
                console.log(action.payload)
                state.courseData=[...action.payload];//since from above we have returned the res.data.course so we can return payload directly
            }
        })
    }
})

export default courseSlice.reducer;