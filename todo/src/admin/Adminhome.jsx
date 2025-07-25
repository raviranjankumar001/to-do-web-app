import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Navigate } from 'react-router-dom';

const Adminhome = () => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
      </div>
    </div>
  )
}

export default Adminhome



