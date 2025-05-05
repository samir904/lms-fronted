//component import
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
//css import
import './index.css'
//library imports
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

//if you want to implement react-router into your whole app then you need to wrap your app by browser router component
//if you wrap your componnet by browser router then routing is activated in whole app
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App />
  <Toaster/>
  </BrowserRouter>
    
  
)
