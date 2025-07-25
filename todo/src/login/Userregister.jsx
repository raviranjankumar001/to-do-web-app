import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/register', {
        username,
        email,
        password,
      });

      // setMessage(res.data.message);
      if (res.data.message === 'user registered successfully') {
        // Optionally redirect or clear form
        setUsername('');
        setEmail('');
        setPassword('');
      }

      alert("account is createted")
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">User Register</h2>

        {message && (
          <p className="mb-3 text-center text-sm text-red-600">{message}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/user/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegister;
