import React from 'react'
import Homelayout from '../../Layouts/HomeLayouts'
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
export default function CheckoutFailure() {
  return (
    <Homelayout>

        <div className='min-h-[90vh] flex items-center justify-center text-white ' >
            <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative ' >
                <h1 className='bg-red-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg  text-center ' >
                    payment failed
                </h1>

                <div className='px-4 flex flex-col items-center justify-center space-y-2 ' >
                    <div className='text-center space-y-2  ' >
                        <h2 className='text-lg font-semibold' >
                            Oops ! Your payment failed
                        </h2>
                        <p className='text-left' >
                            please try again later
                        </p>
                    </div>
                    <CancelIcon className='text-red-500 text-5xl'style={{width: '96px', height: '96px'}} />
                </div>
                <Link to="/checkout" className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-semibold text-center  rounded-bl-lg rounded-br-lg' >
                    <button>
                        Try again
                    </button>
                </Link>
            </div>
            
        </div>

    </Homelayout>
  )
}
