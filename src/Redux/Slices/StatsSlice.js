import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import toastStyles from "../../Helper/Toaststyle"
import axiosInstance from "../../helpers/axiosInstace"

 const initialState={
    allusersCount:0,
    subscribedCount:0
 }
 export const getStatsData=createAsyncThunk("stats/get",async()=>{
    try{
        const reponse=axiosInstance.get("payments/records?count=100");
        toast.promise(reponse,{
            loading:"Getting the stats",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to get the stats"
        })
        return await (reponse).data
    }catch(error){
        toast.error(error?.response?.data?.message,toastStyles.error)
    }
 })

 const statSlice=createSlice({
    name:"stat",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getStatsData.fulfilled,(state,action)=>{
            state.allusersCount=action?.payload?.alluserCount;
            state.subscribedCount=action?.payload?.subscribedUsersCount
            
        })
    }
 })

 export default statSlice.reducer;