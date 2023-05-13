import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPollForm from '../components/NewPollForm';
import { urlApi } from '../helpers/urlApi';
import axios from 'axios';
import AllPollsSection from '../components/AllPollsSection';

export default function UserPage() {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    // const [render, setRender] = useState(false);
    // const [pollsInfo, setPollsInfo] = useState([]);
    
    // const fetchAllPolls = async () => {
    //   const allPolls = await axios
    //     .get(`${urlApi}poll/getall/`,
    //     {headers: {Authorization: localStorage.getItem('token')}});
    //     setPollsInfo(allPolls.data);
    // }

    // useEffect(() => {
    //     const checkToken = localStorage.getItem('token');
    //     if (!checkToken) {
    //       //  navigate('/login');
    //     } else {
    //       fetchAllPolls();
    //     };
    // }, []);

    // useEffect(() => {
    //   if (pollsInfo.length !== 0 ) {
    //     setRender(true);
    //   }
    // }, [pollsInfo]);

  return (
    <div>
      <h1>Your polls:</h1>
      <AllPollsSection />
      <button type='button' onClick={ () => setShowForm(true) }>New Poll</button>
        {showForm && (
        <div>
          <NewPollForm />
        </div>
        )}
    </div>
  )
};
