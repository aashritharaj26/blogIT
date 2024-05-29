import React from 'react'
import { useLocation } from 'react-router-dom';
function UserDashboard() {
  let { state } = useLocation();
  return (
    <div>
      <div className="text-start ms-5">
        <p className="lead fs-3  text-info">
          Welcome ,<span className="text-danger fs-1">{state.username}</span>
        </p>
        <p className="lead">{state.email}</p>
        <p className='lead'>Please Visit Technologies Page</p>
      </div>
    </div>
  );
}

export default UserDashboard