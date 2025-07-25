import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import AdminLogin from './login/adminlogin';
import UserLogin from './login/Userlogin';
import UserRegister from './login/Userregister';
import Adminhome from './admin/Adminhome';
import Userhome from './user/Userhome';
import Createtodo from './user/Createtodo';
import AdminCreatetodo from './admin/Admincreatetodo';
import AdminAllTodo from './admin/Adminalltodo';
import UserAllTodo from './user/Useralltodo';
import AdminAlluser from './admin/Adminalluser';

const Approutes = () => {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/admin/home" element={<Adminhome/>} />
        <Route path="/user/home" element={<Userhome/>} />
        <Route path="/user/createtodo" element={<Createtodo />} />
        <Route path="/admin/createtodo" element={<AdminCreatetodo />} />
        <Route path="/admin/alltodo" element={<AdminAllTodo/>} />
        <Route path="/user/alltodo" element={<UserAllTodo/>} />
        <Route path="/admin/alluser" element={<AdminAlluser/>} />
      </Routes>
    </Router>
  );
}

export default Approutes
