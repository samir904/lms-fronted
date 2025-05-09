import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import toastStyles from "../../Helper/Toaststyle"
import axiosInstance from "../../helpers/axiosInstace"
import { data } from "react-router-dom"

const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:{}
}

export const getRazorPayId=createAsyncThunk("/razorpay/getId",async()=>{
    try{
        const res=await axiosInstance.get("/payments/razorpay-key");
        return res.data
    }catch(error){
        toast.error("failed to load data",toastStyles.error)
    }
})

export const purchaseCourseBundle=createAsyncThunk("/purchsecourse",async()=>{
    try{
        const res=await axiosInstance.post("/payments/subscribe");
        
        return res.data
    }catch(error){
        toast.error(error?.response?.data?.message,toastStyles.error)
    }
})

export const verifyUserPayment=createAsyncThunk("/payments/verify",async(data)=>{
    try{
        const res=await axiosInstance.post("/payments/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return res.data
    }catch(error){
        toast.error(error?.response?.data?.message,toastStyles.error)
    }
})

export const getPaymentRecord=createAsyncThunk("/payments/record",async()=>{
    try{
        const res= axiosInstance.get("/payments?count=100");
        toast.promise(res,{
            loading:"Getting the payment records",
            success:(data)=>{
                return data?.data?.message
            },
            error:"failed to get payment records"
        })
        return await(res).data
    }catch(error){
        toast.error("operation failed",toastStyles.error)
    }
})

export const cancelCourseBUndle=createAsyncThunk("/payments/cancel",async()=>{
    try{
        const res= axiosInstance.post("/payments/unsubscribe");
        toast.promise(res,{
            loading:"unsubscribing the bundle",
            success:(data)=>{
                return data?.data?.message
            },
            error:"failed to unsubscribe"
        })
        return await(res).data
    }catch(error){
        toast.error(error?.response?.data?.message,toastStyles.error)
    }
})

const razorPaySlice=createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            
            state.subscription_id=action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            console.log(action)
            toast.success(action?.payload?.message,toastStyles.success)
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            console.log(action)
            toast.error(action?.payload?.message,toastStyles.error)
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments=action?.payload?.allPayments;
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
        })
    }
})

export default razorPaySlice.reducer;