import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { urlApi } from '../helpers/urlApi';
import Navbar from '../components/Navbar'
import VoteButton from '../components/common/VoteButton';

export default function SinglePollPage() {
    const { id } = useParams();
    const [render, setRender] = useState(false);
    const [pollInfo, setPollInfo] = useState('');
    const [voted, setVoted] = useState(false);
    const [resultButton, setResultButton] = useState(false);
    const [errMessage, setErrMessage] = useState(false);

    const fetchPoll = async() => {
        const fetch = await axios.get(`${urlApi}poll/getOne/${id}`);
        const vote = JSON.parse(localStorage.getItem(`16uifkg${id}36e21`));
        fetch.data.items.forEach((singleItem) => {
            if (singleItem.id === vote) {
                singleItem.color = 'bg-teal-500';
            } else {
                singleItem.color = 'bg-slate-300';
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
        }

        const fetch = await axios.get(`${urlApi}poll/getOne/${id}`);
        const vote = JSON.parse(localStorage.getItem(`16uifkg${id}36e21`));
            fetch.data.items.forEach((singleItem) => {
                if (singleItem.id === Number(vote)) {
                    singleItem.color = 'bg-teal-500';
                } else {
                    singleItem.color = 'bg-slate-300';
                }
            });

            setPollInfo(fetch.data);
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

    // const handleChoiceClick = async(choiceInfo) => {
    //     const findPoll = localStorage.getItem(`16uifkg${id}36e21`)
    //     if (findPoll === '0') {
    //         localStorage.setItem(`16uifkg${id}36e21`, choiceInfo.id);
    //         await axios.put(`${urlApi}item/add/${choiceInfo.id}`);
    //         return ''
    //     };
    //     if (Number(findPoll) === choiceInfo.id) {
    //         await axios.put(`${urlApi}item/remove/${findPoll}`);
    //         localStorage.setItem(`16uifkg${id}36e21`, JSON.stringify(0));
    //         return ''
    //     } else {
    //         await axios.put(`${urlApi}item/remove/${findPoll}`);
    //         localStorage.setItem(`16uifkg${id}36e21`, choiceInfo.id);
    //         await axios.put(`${urlApi}item/add/${choiceInfo.id}`);
    //         return '' 
    //     } 
    // };

  return (
    <div className='w-full h-screen bg-slate-100 '>
        {/* FULL COMPONENT */}
        <Navbar />
        <div className='w-full h-auto bg-slate-100 mt-[70px] sm:mt-[60px] flex flex-col'>
            {render && (
                <div>
                    <h1>{pollInfo.pollTitle}</h1>
                    <h1>{pollInfo.createdAt}</h1>
                    <h1>{pollInfo.user.username}</h1>
                    <h1>Options:</h1>
                { pollInfo.items.map((singleItem) => (
                    <div>
                        <button className={`${singleItem.color} w-full mb-3`} onClick={() => handleChoiceClick(singleItem)}>{singleItem.itemTitle}</button>
                    </div>
                ))}
                </div>
            )}
            {errMessage && (
                <div>
                    <h1>Select one of the choices above and then confirm your vote.</h1>
                </div>
            )}
            {voted ? (
                <div>
                    <h1>Thank you for your vote!</h1>
                    <VoteButton func={''} text={'Poll results'}/>
                </div>
            ) : (
                <div>
                    <VoteButton func={handleConfirmVote} text={'Confirm Vote'}/>
                </div>
            )}
        </div>
    </div>
  )
}
