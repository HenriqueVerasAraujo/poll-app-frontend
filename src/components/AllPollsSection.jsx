import React, { useState, useEffect } from 'react'
import SinglePoll from './common/SinglePoll';
import { urlApi } from '../helpers/urlApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AllPollsSection() {
  const [renderButton, setRenderButton] = useState(false);
  const [render, setRender] = useState(false);
  const [pollsInfo, setPollsInfo] = useState([]);
  const navigate = useNavigate();

  const fetchAllPolls = async () => {
    const allPolls = await axios
      .get(`${urlApi}poll/getall/`,
      {headers: { Authorization: localStorage.getItem('token') } });
      setPollsInfo(allPolls.data);
  };

  useEffect(() => {
    const checkToken = localStorage.getItem('token');
    if (!checkToken) {
        navigate('/login');
    } else {
      fetchAllPolls();
    };
  }, []);

  useEffect(() => {
    if (pollsInfo.length !== 0 ) {
      setRender(true);
    }
  }, [pollsInfo]);

  return (
    <div className='w-full h-auto flex flex-col '>
      {render ? (pollsInfo.map((singlePoll) => (
        <SinglePoll pollInfo={singlePoll}/>
      ))
      ) : (
        <div>
            <h1>You don't have any polls yet.</h1>
        </div>
      )}
    </div>
  )
};
