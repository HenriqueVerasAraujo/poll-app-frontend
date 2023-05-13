import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { urlApi } from '../helpers/urlApi';
import Navbar from '../components/Navbar'
import VoteButton from '../components/common/VoteButton';
import moment from 'moment';

export default function SinglePollPage() {
    const { id } = useParams();
    const [render, setRender] = useState(false);
    const [pollInfo, setPollInfo] = useState('');
    const [voted, setVoted] = useState(false);
    const [resultButton, setResultButton] = useState(false);
    const [errMessage, setErrMessage] = useState(false);
    const navigate = useNavigate();

    const dateFormat = (date) => {
        return moment(date).format('DD-MM-YYYY HH:mm');
    };
    
    const fetchPoll = async() => {
        const fetch = await axios.get(`${urlApi}poll/getOne/${id}`);
        if(fetch.data.errMessage) {
            return navigate('/register');
        }
        const vote = JSON.parse(localStorage.getItem(`16uifkg${id}36e21`));
        fetch.data.createdAt = dateFormat(fetch.data.createdAt);
        fetch.data.items.forEach((singleItem) => {
            if (singleItem.id === vote) {
                singleItem.color = 'bg-teal-500 text-white';
            } else {
                singleItem.color = 'bg-slate-300 text-gray-700';
            }
        });
        setPollInfo(fetch.data);
    };

    useEffect(() => {
        const polls = JSON.parse(localStorage.getItem(`16uifkg${id}36e21`));
        const ifVoted = JSON.parse(localStorage.getItem(`16uifkg${id}36e21x`));
        if (!polls) {
            localStorage.setItem(`16uifkg${id}36e21`, JSON.stringify(0));
        };
        if(ifVoted === 1) {
            setVoted(true);
        };

        fetchPoll();
    }, []);

    useEffect(() => {
        if(pollInfo.items) {
            setRender(false);  
            setRender(true);  
        };
    }, [pollInfo]);

    const handleChoiceClick = async(choiceInfo) => {
        if (voted) {
            return ''
        };
        const findPoll = localStorage.getItem(`16uifkg${id}36e21`)
        if (findPoll === '0') {
            localStorage.setItem(`16uifkg${id}36e21`, choiceInfo.id);
        }else if (Number(findPoll) === choiceInfo.id) {
            localStorage.setItem(`16uifkg${id}36e21`, JSON.stringify(0));
        } else if (Number(findPoll) !== choiceInfo.id) {
            localStorage.setItem(`16uifkg${id}36e21`, choiceInfo.id);
        };
        await fetchPoll();
    };

    const handleConfirmVote = async() => {
        const findPoll = localStorage.getItem(`16uifkg${id}36e21`);
        if (findPoll === '0') {
            return setErrMessage(true);
        } else {
            await axios.put(`${urlApi}item/add/${findPoll}`);
            setErrMessage(false);
            localStorage.setItem(`16uifkg${id}36e21x`, JSON.stringify(1));
            setVoted(true);
        }
    };

    const handleResultButton = async() => {
        await fetchPoll();
        setResultButton(true);
    };

  return (
    <div className='w-full h-screen bg-slate-100 '>
        {/* FULL COMPONENT */}
        <Navbar />
        <div className='w-full h-auto bg-slate-100 pt-[70px] sm:pt-[60px] flex flex-col'>
            {render && (
                <div className={`${resultButton && 'hidden'} w-full h-auto mt-4 px-5`}>
                    <h1>{pollInfo.createdAt}</h1>
                    <h1>{pollInfo.user.username}</h1>
                    {/* QUESTION SECTION  */}
                    <div>
                        <h1 className='text-gray-600 w-auto font-bold text-2xl mb-1'>Poll Question:</h1>
                        <div className='w-full h-auto bg-white p-3 rounded-md'>
                            <h1 className='text-teal-700 font-bold text-2xl'>{pollInfo.pollTitle}</h1>
                        </div>

                    </div>

                    <h1 className='text-gray-600 font-bold text-2xl mb-1'>Options:</h1>
                    {/* VOTE OPTIONS  */}
                { pollInfo.items.map((singleItem) => (
                    <div className=''>
                        <button className={`${singleItem.color} w-full mb-3 px-5 break-words overflow-hidden truncate... rounded-md text-lg text-start font-bold`} onClick={() => handleChoiceClick(singleItem)}>{singleItem.itemTitle}</button>
                    </div>
                ))}
                </div>
            )}
            {errMessage && (
                <div className={`${resultButton && 'hidden'} text-center text-red-700`}>
                    <h1>Select one of the choices above</h1>
                    <h1>and then confirm your vote.</h1>
                </div>
            )}
            {voted ? (
                <div className={`${resultButton && 'hidden'} w-full h-auto flex flex-col items-center justify-center`}>
                    <h1 className='font-bold text-teal-600'>Thank you for your vote!</h1>
                    <VoteButton func={handleResultButton} text={'Results'}/>
                </div>
            ) : (
                <div className='w-full h-auto flex flex-col items-center justify-center'>
                    <VoteButton func={handleConfirmVote} text={'Confirm Vote'}/>
                </div>
            )}
            <h1 className='text-center mt-2'>Want to create your own Poll? <span onClick={() => navigate('/register')} className='text-teal-500'>Sign up now.</span></h1>
        </div>
    </div>
  )
}
