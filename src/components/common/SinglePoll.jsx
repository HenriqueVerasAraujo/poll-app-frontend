import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { urlApi } from '../../helpers/urlApi';
import moment from 'moment';
import axios from 'axios';

export default function SinglePoll({ pollInfo }) {
    const [pollStatus, setPollStatus] = useState(pollInfo.pollStatus);
    const [renderButtons, setRenderButton] = useState(false);

    console.log(pollInfo)
    const navigate = useNavigate();

    const dateFormat = (date) => {
        return moment(date).format('DD-MM-YYYY HH:mm');
    };

    const verifyUserId = () => {
        const userIdFromLocal = localStorage.getItem('userId');
        if (!userIdFromLocal) {
            return setRenderButton(false);
        };
        if (Number(userIdFromLocal) === pollInfo.userId) {
            setRenderButton(true);
        } else {
            setRenderButton(false);
        };
    };

    const updateButtonFunction = async() => {
        await axios.put(`${urlApi}poll/status/${pollInfo.id}`,
            {data: {}},
            {headers: {Authorization: localStorage.getItem('token')}});
        setPollStatus(2);
        console.log(`${urlApi}poll/status/${pollInfo.id}`);
    };

    const deleteButtonFunction = async() => {
        await axios.delete(`${urlApi}poll/delete/${pollInfo.id}`,
          {headers: {Authorization: localStorage.getItem('token')}});
          window.location.reload();
    };

    useEffect(() => {
        verifyUserId();
    }, []);
  
  return (
    <div className='h-auto w-full mb-10 bg-slate-300 rounded-md flex flex-col border-2 border-gray-400 justify-between shadow-xl'>
        {/* TOP PART */}
        <div onClick={() => navigate(`/poll/${pollInfo.id}`) } className='w-full h-full bg-teal-500 cursor-pointer'>
            <h1 className='text-2xl font-bold text-white text-center py-1'>Poll Question</h1>
        </div>
        {/* WHITE PART  */}
        <div onClick={() => navigate(`/poll/${pollInfo.id}`) } className='w-full h-auto bg-slate-100 py-4 cursor-pointer'>
            <h1 className=' px-2 text-teal-700 text-2xl text-center break-words '>{pollInfo.pollTitle}</h1>
        </div>
        {/* BOTTON PART */}
        <div onClick={() => navigate(`/poll/${pollInfo.id}`) } className='w-full h-auto flex px-3 py-1 justify-between items-center cursor-pointer'>
            <h1 className='text-lg text-gray-700'>Created at: {dateFormat(pollInfo.createdAt)}</h1>
            {pollStatus === 1 ? (
                <h1 className='text-lg text-gray-700'>Poll status: <p className='text-teal-700 text-center font-bold text-xl'>Open</p></h1>
            ) : (
                <h1 className='text-lg text-gray-700'>Poll status: <p className='text-red-600 text-center font-bold text-xl'>Ended</p></h1>
            )}
        </div>
            {renderButtons && (
                pollStatus === 1  ? (
                    <button className='w-full h-auto bg-black text-white font-bold py-2 text-xl' onClick={updateButtonFunction} type='button'>End Poll</button>
                ) : (
                    <button className='w-full h-auto bg-black text-white font-bold py-2 text-xl'onClick={deleteButtonFunction} type='button'>Delete Poll</button>
                )
            )}
    </div>
  )
}
