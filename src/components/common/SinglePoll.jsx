import React, { useState, useEffect } from 'react'
import { urlApi } from '../../helpers/urlApi';
import moment from 'moment';
import axios from 'axios';

export default function SinglePoll({ pollInfo }) {
    const [pollStatus, setPollStatus] = useState(pollInfo.pollStatus);
    const [renderButtons, setRenderButton] = useState(false);

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
    <div className='h-auto w-full mb-10 bg-slate-300 rounded-md flex flex-col border-2 border-gray-700'>
        {/* TOP PART */}
        <div className='w-full h-full bg-teal-600'>
            <h1 className='text-2xl font-bold text-slate-100 text-center py-1'>Poll Question</h1>
        </div>
        {/* WHITE PART  */}
        <div className='w-full h-auto bg-white py-4'>
            <h1 className='text-gray-700 text-2xl text-center truncate break-words overflow-hidden truncate... '>{pollInfo.pollTitle}</h1>
        </div>
        {/* BOTTON PART */}
        <div className='w-full h-auto flex px-3 py-1  justify-between items-center '>
            <h1 className='text-lg text-gray-700'>Created at: {dateFormat(pollInfo.createdAt)}</h1>
            {pollStatus === 1 ? (
                <h1 className='text-lg text-gray-700'>Poll status: <p className='text-teal-800 text-center font-bold text-xl'>Open</p></h1>
                
            ) : (
                <h1 className='text-lg text-gray-700'>Poll status: <p className='text-red-600 text-center font-bold text-xl'>Ended</p></h1>
            )}
        </div>
        <div className=''>
            {renderButtons && (
                pollStatus === 1  ? (
                    <div className='w-full h-auto py-2'>
                        <button className='w-full bg-black' onClick={updateButtonFunction} type='button'>End Poll</button>
                    </div>
                ) : (
                    <div>
                        <button className='w-full bg-teal-500 text-white font-bold py-2 text-xl'onClick={deleteButtonFunction} type='button'>Delete Poll</button>
                    </div>
                )
            )}
        </div>
    </div>
  )
}
