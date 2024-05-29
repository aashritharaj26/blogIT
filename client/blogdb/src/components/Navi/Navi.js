import React from 'react'
import { Link } from 'react-router-dom'
function Navi() {
  return (
    <div>
<nav class="navbar navbar-expand-lg navbar text-light  border-body" style={{'background-color': 'black','color':'white'}}>
  <div class="container-fluid=">
  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <div className="cls2">
      <ul class="navbar-nav  me-auto mb-2  mb-lg-0" style={{'alignContent':'baseline'}}>
        <li class="nav-item ">
       <button className="btn btn-outline-primary me-2 ps-4 pe-4">
       <Link className="nav-link text-light"  to="">Home</Link></button> 
        </li>
        <li class="nav-item">
        <button className="btn btn-outline-primary me-2 ps-4 pe-4">
        <Link className="nav-link  text-light"  to="signup">Sign Up</Link></button>
        </li>
        <li className='nav-item'>
        <button className="btn btn-outline-primary me-2 ps-4 pe-4">
        <Link className="nav-link  text-light"  to="signin">Sign In</Link></button>
        </li>
      </ul>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navi;
