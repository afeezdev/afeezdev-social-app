import React from 'react';
import { createRoot } from 'react-dom/client';
import App  from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";


const container = document.getElementById('root')
const root = createRoot(container); 

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
  
);
