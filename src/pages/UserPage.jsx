import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function UserPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = localStorage.getItem('token');
        if (!checkToken) {
            navigate('/login');
        }
    }, []);

  return (
    <div>UserPage</div>
  )
}
