import React from 'react';
import { Home } from "./pages/home/Home";
import Login  from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import UpdateProfile from "./pages/updateProfile/updateProfile";

import { Route, Routes, Navigate } from 'react-router-dom';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App () {
  const { user } = useContext(AuthContext);
    return (
      <div>
          <Routes>
            <Route  path="/" element={ user ? <Home /> : <Register />} />
            <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
            <Route path="/register" element=  {user ? <Navigate replace to="/" /> : <Register />} />
            <Route path="/profile/:username" element={ <Profile/>} />
            <Route path="/update/profile" element={ <UpdateProfile/>} />
          </Routes>
      </div>
    );
  
}

export default App;
