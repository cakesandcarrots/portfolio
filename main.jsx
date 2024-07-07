import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './src/components/Navbar.jsx'
import {Contactme} from './src/components/Contactme.jsx'
import { Hero } from './src/components/Hero.jsx'
import { About } from './src/components/About.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Navbar></Navbar>
    {/* <Hero></Hero> */}
    <About></About>
     </React.StrictMode>,
)
