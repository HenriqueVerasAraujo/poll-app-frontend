import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { urlApi } from '../helpers/urlApi';
import Navbar from '../components/Navbar'
import VoteButton from '../components/common/VoteButton';
import moment from 'moment';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { clipIcon, logoIcon } from '../icons/icons';


export default function SinglePollPage() {
    const { id } = useParams();
    const [render, setRender] = useState(false);
    const [pollInfo, setPollInfo] = useState('');
    const [voted, setVoted] = useState(false);
    const [resultButton, setResultButton] = useState(false);
    const [errMessage, setErrMessage] = useState(false);
    const [pollStatus, setPollStatus] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const dateFormat = (date) => {
        return moment(date).format('DD-MM-YYYY HH:mm');
    };
    
    const copyToClipboard = () => {
        setCopied(false)
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        return setCopied(true);
    };

    const fetchPoll = async() => {
        const fetch = await axios.get(`${urlApi}poll/getOne/${id}`);
        let totalVotes = 0;
        if(fetch.data.errMessage) {
            return navigate('/register');
        }
        const vote = JSON.parse(localStorage.getItem(`16uifkg${id}36e21`));
        fetch.data.createdAt = dateFormat(fetch.data.createdAt);
        fetch.data.items.forEach((singleItem) => {
          totalVotes += singleItem.votes;
        });
        fetch.data.totalVotes = totalVotes;
        
        fetch.data.items.forEach((singleItem) => {
            singleItem.votePercent = `${((singleItem.votes * 100) / totalVotes).toFixed(0)}%`;
            console.log(singleItem.votePercent);
        });

        fetch.data.items.forEach((singleItem) => {
            if (singleItem.id === vote) {
                singleItem.color = 'bg-teal-500 text-white';
                singleItem.textColor = 'text-white';
            } else {
                singleItem.color = 'bg-slate-300 text-gray-700';
                singleItem.textColor = 'text-gray-700';
            }
        });
        if(fetch.data.pollStatus === 2) {
            setPollStatus(true);
            setVoted(true);
        };
        console.log(fetch.data)
        setPollInfo(fetch.data);
    };

    useEffect(() => {
        AOS.init({duration: 1300});
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
    <div className='w-full h-screen bg-slate-100'>
        {/* FULL COMPONENT */}
        
        <div className='w-full h-auto bg-slate-100 pt-[70px] sm:pt-[60px] flex flex-col'>
            {render && (
                <div className={`w-full h-auto mt-7 px-5`}>
                    {/* CREATED BY AREA */}
                    <div data-aos="fade-down">
                        <h1 className='text-gray-600 break-words text-center text-2xl font-bold'>This Poll was created by: <span className='text-teal-700 break-words' >{pollInfo.user.username}</span></h1>
                    </div>
                    {/* POLL STATUS AREA */}
                    <div className='w-full h-auto flex flex-col justify-center items-center mt-4' data-aos="fade-down">
                        <h1 className='text-gray-600 text-2xl font-bold'>Poll Status: </h1>
                    {pollStatus ? (
                        <div className=''>
                            <h1 className='text-2xl text-red-600 font-bold'>This Poll has ended.</h1>
                        </div>
                        ) : (
                        <h1 className=' text-2xl text-teal-600 font-bold'>This Poll is open to vote.</h1>
                        )}
                    </div>
                    {/* QUESTION SECTION  */}
                    <div className='mt-5' data-aos="fade-right">
                        <h1 className='text-gray-600 w-auto font-bold text-2xl mb-1'>Poll Question:</h1>
                        <div className='w-full h-auto bg-white p-3 rounded-md'>
                            <h1 className='text-teal-600 font-bold break-words text-2xl'>{pollInfo.pollTitle}</h1>
                        </div>
                    </div>
                    {/* VOTE OPTIONS  */}
                    <div> 
                        {!resultButton ? (
                        <div data-aos="fade-right">
                            <h1 className='text-gray-600 font-bold text-2xl mt-5 mb-2'>Vote Options:</h1>
                            { pollInfo.items.map((singleItem) => (
                                <div>
                                    <button className={`${singleItem.color} w-full mb-3 px-5 py-2 break-words overflow-hidden truncate... rounded-md text-lg text-start font-bold`} onClick={() => handleChoiceClick(singleItem)}>{singleItem.itemTitle}</button>
                                </div>
                            ))}
                        </div>
                        ) : (
                            <div className='' >
                            <h1 className='text-gray-600 font-bold text-2xl mt-5 mb-2'>Results:</h1>
                            { pollInfo.items.map((singleItem) => (
                                <div className=''>
                                    <div className='w-full h-auto relative z-0 '>
                                        <div className='w-full h-full flex justify-end items-center pr-4 absolute'>
                                            <h1 className={`${singleItem.color} text-xl font-bold text-center` }>{singleItem.votePercent}</h1>
                                        </div>
                                        <div className='bg-slate-600 w-full h-full absolute rounded-md opacity-50' style={{width: singleItem.votePercent}}></div>
                                        <h1 className={`${singleItem.textColor} w-full px-5 pr-[20%] py-2 absolute leading-8 line-clamp-1 overflow-hidden truncate... rounded-md text-lg text-start font-bold line`}>{singleItem.itemTitle}</h1>
                                        <h1 className={`${singleItem.color} w-full px-5 pr-[20%] py-2 line-clamp-1 leading-8 overflow-hidden truncate... rounded-md text-lg text-start font-bold line`}>{singleItem.itemTitle}</h1>
                                    </div>
                                    <div className='w-full h-auto mb-3 flex justify-end items-center px-2'>
                                        <h1 className='text-xl text-gray-600 font-bold'>votes: {singleItem.votes}</h1>
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            )}
            {errMessage && (
                <div className={`${resultButton && 'hidden'} text-center text-red-700`}>
                    <h1>Select one of the options above</h1>
                    <h1>and then confirm your vote.</h1>
                </div>
            )}
            {voted ? (
                <div className={`${resultButton && 'hidden'} w-full h-auto flex flex-col items-center justify-center`} >
                    {!pollStatus && (
                        <h1 className='font-bold text-teal-600'>Thank you for your vote!</h1>
                    )}
                    <VoteButton func={handleResultButton} text={'Results'}/>
                </div>
            ) : (
                <div className='w-full h-auto flex flex-col items-center justify-center'>
                    <VoteButton func={handleConfirmVote} text={'Confirm Vote'}/>
                </div>
            )}
            <div className='w-full h-auto flex flex-col justify-center items-center mt-4 bg-slate-100'>
                <div
                onClick={copyToClipboard}
                className='w-full h-auto flex justify-center items-center text-gray-600 hover:text-teal-600 hover:cursor-pointer'
                >
                    <h1>{clipIcon}</h1>
                    {copied ? (
                        <h1 className='text-lg '>Poll URL copied!</h1>
                    ) : (
                        <h1 className='text-lg '>Copy Poll URL to share this Poll</h1>
                    )}
                    <h1>{clipIcon}</h1>
                </div>
                <h1 className='text-center mt-2 pb-5'>Want to create your own Poll? <span onClick={() => navigate('/register')} className='text-teal-500 hover:cursor-pointer'>Sign up now.</span></h1>
            </div>
        </div>
        <Navbar />
    </div>
  )
}
