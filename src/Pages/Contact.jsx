import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import toast from 'react-hot-toast';
import toastStyles from '../Helper/Toaststyle';
import { isEmail } from '../helpers/regexMatch';
import Signup from './Signup';
import axiosInstance from '../helpers/axiosInstace';

export default function Contact() {
    const [userinput, setuserinput] = useState({
        name: "",
        email: "",
        message: "",

    })
    async function onformsubmit(e) {
        e.preventDefault();
        if (!userinput.email || !userinput.name || !userinput.message) {
            toast.error("All fields are required", toastStyles.error)
            return;
        }
        if (!isEmail(userinput.email)) {
            toast.error("email should be valid ", toastStyles.error)
            return;
        }
        try {
            const response = axiosInstance.post("/contact", userinput);
            toast.promise(response, {
                loading: "Submitting your form",
                success: "Form submitted successfully",
                error: "failed to submit the form"
            }, {
                loading: toastStyles.loading,
                success: toastStyles.success,
                error: toastStyles.error
            })
            const contactresponse = await response;
            if (contactresponse?.data?.success) {
                setuserinput({
                    name: "",
                    email: "",
                    message: "",
                })
            }
        } catch (e) {
                toast.error("operation failed",toastStyles.error)
        }
    }

    function handleInputchangea(e) {
        const { name, value } = e.target;
        console.log(name, value)
        setuserinput({
            ...userinput,
            [name]: value
        })
    }
    return (
        <HomeLayouts>
            <div className='flex items-center justify-center h-[100vh]' >
                <form
                    noValidate
                    onSubmit={onformsubmit}
                    className='flex flex-col items-center  justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem] '
                    action="">
                    <h1 className='text-3xl font-semibold' >
                        Contact Form
                    </h1>
                    <div className='flex flex-col w-full gap-1' >
                        <label
                            className='text-lg font-semibold  '
                            htmlFor="name">Name</label>
                        <input
                        value={userinput.name}
                            required
                            onChange={handleInputchangea}
                            id='name'
                            name='name'
                            placeholder='Enter your name '
                            className='bg-transparent border px-2 py-1 rounded-sm '
                            type="text" />
                    </div>
                    <div className='flex flex-col w-full gap-1' >
                        <label
                            className='text-lg font-semibold  '
                            htmlFor="email">Email</label>
                        <input
                        value={userinput.email}
                            required
                            onChange={handleInputchangea}
                            id='email'
                            name='email'
                            placeholder='Enter your email '
                            className='bg-transparent border px-2 py-1 rounded-sm '
                            type="email" />
                    </div>
                    <div className='flex flex-col w-full gap-1' >
                        <label
                            className='text-lg font-semibold  '
                            htmlFor="message">Message</label>
                        <textarea
                        value={userinput.message}
                            required
                            onChange={handleInputchangea}
                            id='message'
                            name='message'
                            placeholder='Enter your message '
                            className='bg-transparent resize-none h-40 scroll-y border px-2 py-1 rounded-sm '
                            type="text" />
                    </div>
                    <button
                        className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 cursor-pointer mt-2 rounded-sm font-semibold text-lg'
                        type='submit' >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayouts>
    )
}
