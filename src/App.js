import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';

function App() {
  return (
 <BrowserRouter>
  <Routes>
    <Route exact path="/login" element={ <LoginPage /> } />
    <Route exact path="/register" element={ <RegisterPage /> } />
    <Route exact path="/user" element={ <UserPage/> } />
  </Routes>
 </BrowserRouter>
  );
};

export default App;