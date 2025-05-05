//component import
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
//css import
import './index.css'
//library imports
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store.js'

//if you want to implement react-router into your whole app then you need to wrap your app by browser router component
//if you wrap your componnet by browser router then routing is activated in whole app

//to activate react-redux store in whole application you need to warp the app by provider component and pass store as store file name as props
createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <BrowserRouter>
  <App />
  <Toaster/>
  </BrowserRouter>
  </Provider>
  
)
