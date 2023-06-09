import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import SinglePollPage from './pages/SinglePollPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
 <BrowserRouter>
  <Routes>
    <Route exact path="/" element={ <LoginPage /> } />
    <Route exact path="/login" element={ <LoginPage /> } />
    <Route exact path="/register" element={ <RegisterPage /> } />
    <Route exact path="/user" element={ <UserPage/> } />
    <Route exact path="/poll/:id" element={ <SinglePollPage/> } />
    <Route exact path="/about" element={ <AboutPage/> } />
  </Routes>
 </BrowserRouter>
  );
};

export default App;