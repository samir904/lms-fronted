import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import {Link} from "react-router-dom"
import Footer from "../Components/Footer.jsx"

export default function HomeLayouts({children}) {

  function changewidth() {
    const drawerside = document.getElementsByClassName("drawer-side");
    drawerside[0].style.width = 'auto';
  }

  function hidedrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    const drawerside = document.getElementsByClassName("drawer-side");
    drawerside[0].style.width = '0';
  }

  return (
    <div className='min-h-[90vh] '>
      <div className='drawer absolute left-0 z-50 w-fit'>
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className='drawer-content'>
          <label
            className='cursor-pointer relative'
            htmlFor="my-drawer"
          >
            <MenuIcon
              fontSize='large'
              className='font-bold text-white m-4'
              onClick={changewidth}
            />
          </label>
        </div>
        <div className='drawer-side w-0'>
          <label className='drawer-overlay' htmlFor="my-drawer"></label>
          <ul className='menu p-4 w-64 sm:w-80 bg-base-200 text-base-content'>
            <li className='w-fit absolute right-2 z-50'>
              <button onClick={hidedrawer}>
                <CancelIcon fontSize='medium' />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {children}
      <Footer />
      </div>
    </div>
  )
}