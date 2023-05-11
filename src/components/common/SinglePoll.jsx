import React, { useState, useEffect } from 'react'
import { urlApi } from '../../helpers/urlApi';
import axios from 'axios';


export default function SinglePoll({ pollInfo }) {
    const [pollStatus, setPollStatus] = useState(pollInfo.pollStatus);
    const [renderButtons, setRenderButton] = useState(false);

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
    <div className='mb-10'>
        <h1>{pollInfo.pollTitle}</h1>
        <h1>{pollInfo.createdAt}</h1>
        {pollStatus === 1 ? (
            <h1>Open</h1>
        ) : (
            <h1>Ended</h1>
        )}
        {renderButtons && (
            pollStatus === 1  ? (
                <div>
                    <button onClick={updateButtonFunction} type='button'>End Poll</button>
                </div>
            ) : (
                <div>
                    <button onClick={deleteButtonFunction} type='button'>Delete Poll</button>
                </div>
            )
        )}
    </div>
  )
}
