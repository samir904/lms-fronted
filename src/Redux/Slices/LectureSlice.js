import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstace"
import toast from "react-hot-toast"

const initialState = {
    lectures: []
}

export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (cid) => {
    try {
        const response = axiosInstance.get(`courses/${cid}`)
        toast.promise(response, {
            loading: "Fetching course lectures",
            success: "Lectures fetched successfully",
            error: "failed to fetch the lectures"
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const addCourseLectures = createAsyncThunk(
    "/course/lecture/add",
    async (data) => {
      try {
        const formdata = new FormData();
        formdata.append("lecture", data.lecture);
        formdata.append("title", data.title);
        formdata.append("description", data.description);
  
        // Debug: Log FormData contents
        for (let [key, value] of formdata.entries()) {
          console.log(`FormData ${key}:`, value);
        }
  
        const response = axiosInstance.post(`/courses/${data.id}`, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.promise(response, {
          loading: "Adding course lecture",
          success: "Lecture added successfully",
          error: "Failed to add the lectures",
        });
        return (await response).data;
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        throw error;
      }
    }
  );

export const deleteCourseLectures = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const response = axiosInstance.delete(
            `/courses/${data.courseId}/lectures/${data.lectureId}`
          );
        toast.promise(response, {
            loading: "deleting course lecture",
            success: "Lecture deleted successfully",
            error: "failed to delelte the lecture"
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled,(state,action)=>{
            console.log(action)
            state.lectures=action?.payload?.lectures
        })
        .addCase(addCourseLectures.fulfilled,(state,action)=>{
            console.log(action)
            state.lectures=action?.payload?.course?.lecture
        })
    }
})

export default lectureSlice.reducer;