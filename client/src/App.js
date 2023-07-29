import React, { Component } from 'react';
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";

import { Route, Routes } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
          <Routes>
            <Route  path="/" element={ <Home/>} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/profile/:username" element={ <Profile/>} />
            <Route path="/register" element={ <Register/>} />
          </Routes>
      </div>
    );
  }
}

export default App;
