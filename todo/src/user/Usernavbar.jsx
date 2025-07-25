// src/components/AdminNavbar.jsx
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">User</h1>
      <div className="space-x-4">
        <Link to="/user/createtodo" className="hover:underline">Create todo</Link>
        <Link to="/user/alltodo" className="hover:underline">All todo</Link>
        {/* <Link to="/admin/manage-categories" className="hover:underline">Manage Categories</Link> */}
        <button
          onClick={() => {
             localStorage.removeItem("userToken");
            localStorage.removeItem("userEmail");
            window.location.href = "/user/login";
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
