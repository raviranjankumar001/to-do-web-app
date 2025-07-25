import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";

const AdminCreatetodo = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !type || !email) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/api/add/admin`, {
        title,
        type,
        email
      });

      alert("Todo created successfully!");
      setTitle('');
      setType('');
      setEmail('');
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo');
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* App Header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-white bg-blue-700 py-2">
          Todo List App (Admin)
        </h1>

        {/* Add Todo Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
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
          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default AdminCreatetodo;
