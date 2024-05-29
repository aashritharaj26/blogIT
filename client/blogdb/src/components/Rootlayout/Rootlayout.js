import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Rootlayout.css'
function Rootlayout() {
  return (
    <div className='root1'>
       <Header/>
       <div style={{ minHeight: "60vh"}} >
        <div className="container ">
          {" "}
          <Outlet />
        </div>
       
      </div>
      <div style={{marginTop:"100px"}}>
      <Footer/>
      </div>
       
    </div>
  )
}

export default Rootlayout;