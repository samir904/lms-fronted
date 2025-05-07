import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeLayouts from './Layouts/HomeLayouts'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'

function App() {
 

  //if you have one route on page then use route 
  //but if you have more than one route then you need to wrap the route component with routes for every individual route ok 
  return (
    <>
      <Routes>
        
        <Route path='/' element={<HomePage/>}  ></Route>
        <Route path='/about' element={<AboutUs/>}  ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='*' element={<NotFound/>} ></Route>
      </Routes>
      
    </>
  )
}

export default App
