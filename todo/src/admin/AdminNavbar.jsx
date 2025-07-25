// src/components/AdminNavbar.jsx
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin</h1>
      <div className="space-x-4">
        {/* <Link to="/admin/createtodo" className="hover:underline">Create todo</Link> */}
        <Link to="/admin/alltodo" className="hover:underline">All todo</Link>
        <Link to="/admin/alluser" className="hover:underline">All user</Link>
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
