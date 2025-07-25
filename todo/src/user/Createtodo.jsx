import React, { useState } from "react";
import axios from "axios";
import UserNavbar from "./Usernavbar";
import { Navigate } from 'react-router-dom';


const Createtodo = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail") || "test@example.com";

    try {
      const res = await axios.post(`http://localhost:3000/api/add/user`, {
        title,
        type,
        email,
      });

      alert("Todo added!");
      setTitle("");
      setType("");
    } catch (err) {
      console.error("Error adding todo:", err);
      alert("Failed to add todo");
    }
  };

   const token = localStorage.getItem('userToken');
    
       if (!token) {
        return <Navigate to="/user/login" replace />;
      }

  return (
    <div>
      <UserNavbar/>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* App Header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-white bg-blue-700 py-2">
          Todo List App
        </h1>

        {/* Add Todo Form */}
        <form
          id="addTodoForm"
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Enter new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            placeholder="Urgent or Non-Urgent"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createtodo;
