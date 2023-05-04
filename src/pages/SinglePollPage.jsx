import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { urlApi } from '../helpers/urlApi';

export default function SinglePollPage() {
    const { id } = useParams();
    const selectColor = 'blue'
    const emptyColor = 'green'
    const [selected, setSelected] = useState({});
    const [render, setRender] = useState(false);
    const [pollInfo, setPollInfo] = useState('');

    const fetchPoll = async() => {
        axios.get(`${urlApi}poll/getOne/${id}`).then((response) => {
            setPollInfo(response.data)})
    };

    useEffect(() => {
        const polls = JSON.parse(localStorage.getItem(`16uifkg${id}36e21`));
        if (!polls) {
            localStorage.setItem(`16uifkg${id}36e21`, JSON.stringify(0));
        };

        fetchPoll();
    }, []);

    useEffect(() => {
        if(pollInfo.items) {
            setRender(true);
        };
    }, [pollInfo]);

    const handleChoiceClick = async(choiceInfo) => {
        const findPoll = localStorage.getItem(`16uifkg${id}36e21`)
        if (findPoll === '0') {
            localStorage.setItem(`16uifkg${id}36e21`, choiceInfo.id);
            await axios.put(`${urlApi}item/add/${choiceInfo.id}`);
            return ''
        };
        if (Number(findPoll) === choiceInfo.id) {
            await axios.put(`${urlApi}item/remove/${findPoll}`);
            localStorage.setItem(`16uifkg${id}36e21`, JSON.stringify(0));
            return ''
        } else {
            const unvote = await axios.put(`${urlApi}item/remove/${findPoll}`);
            console.log(unvote.data);
            localStorage.setItem(`16uifkg${id}36e21`, choiceInfo.id);
            await axios.put(`${urlApi}item/add/${choiceInfo.id}`);
            return '' 
        } 
    };

  return (
    <div>
        {render && (
            <div>
                <h1>{pollInfo.pollTitle}</h1>
                <h1>{pollInfo.createdAt}</h1>
                <h1>{pollInfo.user.username}</h1>
                <h1>Options:</h1>
               { pollInfo.items.map((singleItem) => (
                <div>
                    <button onClick={() => handleChoiceClick(singleItem)}>{singleItem.itemTitle}</button>
                </div>
               ))}
            </div>
        )}
    </div>
  )
}
