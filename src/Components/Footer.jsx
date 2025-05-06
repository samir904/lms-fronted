import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
export default function Footer() {
    const currentdate=new Date();
    const year=currentdate.getFullYear();
  return (
    <>
        <footer className='relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white  bg-gray-800 py-5 sm:px-20 w-full ' >
            <section className='text-lg ' >
                Copyright {year} | All rights reserved
            </section>
            <section className='flex items-center justify-center gap-5 text-2xl text-white ' >
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer ' >
                    <FacebookIcon/>
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300  cursor-pointer ' >
                    <InstagramIcon/>
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer ' >
                    <LinkedInIcon/>
                </a>
                <a className='hover:text-yellow-500 transition-all ease-in-out duration-300 cursor-pointer ' >
                    <XIcon/>
                </a>
            </section>
        </footer>
    </>
  )
}

//tailwind unit 
// 1 unit=.25 rem or 4 px 
