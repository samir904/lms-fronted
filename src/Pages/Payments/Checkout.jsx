import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../Redux/Slices/RazorpaySlice';
import toast from 'react-hot-toast';
import toastStyles from '../../Helper/Toaststyle';
import HomeLayouts from '../../Layouts/HomeLayouts';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
export default function Checkout() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const razorpayKey=useSelector((state)=>state?.razorpay?.key);
    const subscription_id=useSelector((state)=>state?.razorpay?.subscription_id);
    const isPaymentVerified=useSelector((state)=>state?.razorpay?.isPaymentVerified);
    const userdata=useSelector((state)=>state?.auth?.data)
    const userData=useSelector((state)=>state?.auth?.data);//this is "?" check for null
    const paymentDetails={
        razorpay_payment_id:"",
            razorpay_subscription_id:"",
            razorpay_signature:""
    }
    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }
    async function handleSubscription(e) {
        e.preventDefault();
        if(!razorpayKey||!subscription_id){
            toast.error("something went wrong",toastStyles.error)
        }
        const options={
            key:razorpayKey,
            subscription_id: subscription_id,
            name:"coursify Pvt. Ltd.",
            description:"subscription",
            theme:{
                color:"#f37254"
            },
            prefil:{
                email:userData.email,
                name:userData.fullName
            },

            handler: async function (response) {
                console.log("Razorpay handler response:", response);
                console.log("Available response keys:", Object.keys(response));
                console.log("Full response stringified:", JSON.stringify(response, null, 2));
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature || response.signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id || response.razorpay_subscriptionId;
                console.log("paymentDetails before dispatch:", paymentDetails);
                toast.success("Payment successful", toastStyles.success);
                const res = await dispatch(verifyUserPayment(paymentDetails));
                console.log("verifyUserPayment response:", res);
                
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        }
        console.log("Razorpay options:", options);
        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
    }
    useEffect(()=>{
        load()
    },[])

  return (
    <HomeLayouts>
        
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available courses of our platform for{' '}
              <span className="text-yellow-500 font-bold">
                <br />
                1 Year duration
              </span>
              All the existing and newly launched courses will also be available.
            </p>
            <p className="flex items-center justify-center gap-1 text-xl font-bold text-yellow-500">
              <CurrencyRupeeOutlinedIcon /> <span>499</span> Only
            </p>
            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>*Terms and Conditions Apply*</p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-amber-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
            
          >
            Buy now
          </button>
        </div>
      </form>
    
    </HomeLayouts>
  )
}
