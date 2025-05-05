import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
 

  //if you have one route on page then use route 
  //but if you have more than one route then you need to wrap the route component with routes for every individual route ok 
  return (
    <>
      <Routes>
        
        {/* <Route path='/' element={<Home/>}  ></Route> */}
      </Routes>
    </>
  )
}

export default App
