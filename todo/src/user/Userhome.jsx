import React from 'react';
import UserNavbar from './Usernavbar';
import { Navigate } from 'react-router-dom';


const Userhome = () => {
  const token = localStorage.getItem('userToken');

   if (!token) {
    return <Navigate to="/user/login" replace />;
  }
  
  return (
    <div>
      <UserNavbar/>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to user Dashboard</h2>
      </div>
    </div>
  )
}

export default Userhome



