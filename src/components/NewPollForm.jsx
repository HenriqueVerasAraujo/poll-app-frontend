import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { urlApi } from '../helpers/urlApi';


export default function NewPollForm() {
  const navigate = useNavigate();

    const [errMessage, setErrMessage] = useState('');
    const [pollTitle, setPollTitle] = useState('');
    const [pollItem, setPollItem] = useState('');
    const [checkPollItem, setCheckPollItem] = useState(false);
    const [itemsList, setItemsList] = useState([]);
    const [renderMessage, setRenderMessage] = useState(false);

//   const submitForm = async(data) => {
//     setRenderMessage(false);
//     setErrMessage('');
//     const check = await axios.post(`${urlApi}user/create`, data)
//     console.log(check.data);
//     if (check.data.message) {
//         setRenderMessage(true);
//     } else {
//         setErrMessage(check.data.errMessage);
//     };
// };
const pollQuestionHandler = ({ target }) => {
  setPollTitle(target.value);
};

const pollItemHandler = ({ target }) => {
  setPollItem(target.value);
};

// const verifyForm = () => {
//   setErrMessage('');
//   if (pollTitle.length < 1) {
//     setErrMessage('Your Poll Question must be at least 2 characters long.')
//   }
// };

const createNewVoteOption = () => {
  setCheckPollItem(true);
  console.log('ativo');
}

const doneVoteOption = () => {
  
  setItemsList([...itemsList, pollItem]);
  setPollItem('');
  setCheckPollItem(false);
};

const createPollFunction = async(event) => {
  event.preventDefault();
}
  return (
    <div className=''>
        <form 
        className='flex flex-col'
        onSubmit={createPollFunction}
        >
            <label>Poll Question: </label>
            <input 
            type="text"
            onChange={pollQuestionHandler}
             />
         <h1>Vote options:</h1>
         {itemsList.length !== 0 && itemsList.map((singleItem) => (
          <div>
            <h1>{singleItem}</h1>
          </div>
         ))}
         {checkPollItem && (
          <div>
            <h1>New vote option:</h1>
            <input
            type="text"
            onChange={pollItemHandler}
            />
            <button
            onClick={doneVoteOption}
            >Create
            </button>
          </div>
         )}
         <button
         onClick={createNewVoteOption}
         disabled={checkPollItem}
         >Create a new Vote Option</button>
            {errMessage !== '' && 
                <h1>{errMessage}</h1>
            }
            <button type="submit">Create Poll</button>
        </form>
        {renderMessage && (
            <h1>Poll Created!</h1>
        )}
    </div>
  )
};
