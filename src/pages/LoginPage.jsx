import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

export default function MainPage() {
  return (
    <div
    className='w-full h-screen bg-slate-300'
    >
      <Navbar />
      <LoginForm />
      </div>
  )
}
