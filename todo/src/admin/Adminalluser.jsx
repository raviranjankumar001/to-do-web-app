import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { Navigate } from 'react-router-dom';


const AdminAlluser = () => {
  const [alluser, setalltodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('adminToken');

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user");
      setalltodo(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setLoading(false);
    }
  };






  useEffect(() => {
    fetchTodos();
  }, []);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (<>
  <AdminNavbar/>
    <div className="max-w-5xl mx-auto mt-6 p-4">
        
      <h1 className="text-3xl font-bold mb-6 text-center text-white bg-blue-700 py-3 rounded">
        All User
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : alluser.length === 0 ? (
        <p className="text-center text-red-500">No user</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {alluser.map((todo, index) => (
                <tr key={todo._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{todo.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminAlluser;
