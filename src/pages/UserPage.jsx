import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPollForm from '../components/NewPollForm';



export default function UserPage() {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = localStorage.getItem('token');
        if (!checkToken) {
            navigate('/login');
        }
    }, []);

  return (
    <div>
      <button onClick={ () => setShowForm(true) }>New Poll</button>
      {showForm &&
        <div>
          <NewPollForm />
        </div>
      }
    </div>
  )
};
