import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPollForm from '../components/NewPollForm';
import { urlApi } from '../helpers/urlApi';
import axios from 'axios';
import AllPollsSection from '../components/AllPollsSection';
import Navbar from '../components/Navbar';

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
    <div className='w-full h-screen bg-slate-100'>
      {/* FULL COMPONENT */}
      <Navbar />
      <div className='w-full h-auto bg-slate-100 pt-[70px] sm:pt-[60px] flex flex-col justify-center'>
        {/* USER POLLS SECTION  */}
        <div className='w-full h-auto mt-7 px-5'>
          <h1 className='text-gray-600 break-words text-2xl font-bold mb-3'>Your polls:</h1>
          <AllPollsSection />
        </div>
        {/* NEW POLL SECTION  */}
        <div className='w-full h-auto flex justify-center items-center'>
          {!showForm ? (
            <button className='w-[70%] h-auto p-3 bg-teal-500 text-white font-bold text-2xl rounded-md  focus:bg-white focus:border-2 focus:border-teal-500 focus:text-teal-500 mb-10' type='button' onClick={ () => setShowForm(true) }>Create a new Poll</button>
          ) : (
          <div className='w-full h-auto px-5'>
            <NewPollForm />
          </div>
          )}
        </div>
      </div>
    </div>
  )
};
