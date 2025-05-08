import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeLayouts from './Layouts/HomeLayouts'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Denied from './Pages/Denied'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'

function App() {
 

  //if you have one route on page then use route 
  //but if you have more than one route then you need to wrap the route component with routes for every individual route ok 
  return (
    <>
      <Routes>
        
        <Route path='/' element={<HomePage/>}  ></Route>
        <Route path='/about' element={<AboutUs/>}  ></Route>
        <Route path='/contact'element={<Contact/>} ></Route>
        <Route path='/denied' element={<Denied/>} ></Route>
      
        <Route path='/course/description' element={<CourseDescription/>}  ></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}  >
          <Route path='/course/create' element={<CreateCourse/>} ></Route>
        </Route>

        <Route element={<RequireAuth  allowedRoles={["ADMIN","USER"]} />} allowedRoles={["ADMIN","USER"]} >
            <Route path='/user/profile'  element={<Profile/>} ></Route>
            <Route path='/user/editprofile'  element={<EditProfile/>} ></Route>
        </Route>

        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/courses' element={<CourseList/>}></Route>
        <Route path='*' element={<NotFound/>} ></Route>
      </Routes>
      
    </>
  )
}

export default App
