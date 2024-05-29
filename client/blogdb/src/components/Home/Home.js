import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='d-block  shadow border border-3' style={{'justifyContent':'center','textAlign':'center'}}>
      <div className="row row-cols-2  ">
        {/* <div className="col ms-1" style={{'backgroundImage':'url(https://t3.ftcdn.net/jpg/02/02/30/72/360_F_202307290_dD9zkCtR6tzMChYJ5o3AaFNUCA6XMYcp.jpg)','minHeight':'30%','width':'45%'}}>
          {/* <img src="https://t3.ftcdn.net/jpg/02/02/30/72/360_F_202307290_dD9zkCtR6tzMChYJ5o3AaFNUCA6XMYcp.jpg" className="img-fluid" alt="Descriptive Alt Text" /> */}
        {/* </div> */} 
        <div className="col" style={{'minHeight':'30%','width':'45%'}}>
          <img src="https://t3.ftcdn.net/jpg/02/02/30/72/360_F_202307290_dD9zkCtR6tzMChYJ5o3AaFNUCA6XMYcp.jpg" className="img-fluid" alt="Descriptive Alt Text" />
       </div> 
        <div className="col">
          <h1 className='text-dark display-3 mt-5 pt-5' style={{ fontFamily: 'Platypi' }}>aspire to inspire</h1>
          <h1 className='text-dark fs-3 ' style={{ fontFamily: 'Platypi' }}>
            knowledge shared = <var>knowledge<sup>2</sup></var>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
