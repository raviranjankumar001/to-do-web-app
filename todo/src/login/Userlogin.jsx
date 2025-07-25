import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      });

      console.log(res.data);
      
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);
      console.log(res.data);
      

      
      navigate("/user/home");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMsg(err.response.data.message || "Login failed");
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
        )}

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
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/user/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
        <p className="mt-4 text-center text-sm">
         Admin Login?{" "}
          <Link to="/admin/login" className="text-blue-600 hover:underline">
            admin login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
