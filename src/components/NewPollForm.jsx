import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlApi } from '../helpers/urlApi';
import SingleItem from './common/SingleItem';


export default function NewPollForm() {

    const [errMessage, setErrMessage] = useState('');
    const [errItem, setErrItem] = useState('');
    const [renderErr, setRenderErr] = useState(false);
    const [pollTitle, setPollTitle] = useState('');
    const [pollItem, setPollItem] = useState('');
    const [checkPollItem, setCheckPollItem] = useState(false);
    const [itemsList, setItemsList] = useState([]);
    const [renderMessage, setRenderMessage] = useState(false);
    const [itemId, setItemId] = useState(0);



const pollQuestionHandler = ({ target }) => {
  setPollTitle(target.value);
};

const pollItemHandler = ({ target }) => {
  setPollItem(target.value);
};

const verifyForm = () => {
  setErrMessage('');
  if (pollTitle.length <= 1) {
    setErrMessage('Your Poll Question must be at least 2 characters long.');
    return false;
  };

  if (itemsList.length <= 1) {
    setErrMessage('Your Poll must have at least 2 vote options.');
    return false;
  };
  return true;
};

const doneVoteOption = () => {
  setErrItem('');
  if (pollItem.length <= 0) {
    return setErrItem('This field must be filled.');
  }
  setItemsList([...itemsList, { itemTitle: pollItem, itemId }]);
  setItemId(prev => prev + 1);
  setPollItem('');
  setCheckPollItem(false);
};

const createPollFunction = async(event) => {
  event.preventDefault();
  setRenderErr(false);
  const verify = verifyForm();
  if (!verify) {
    return setRenderErr(true);
  };
  const data = {
    pollTitle,
    items: itemsList
  };

  await axios.post(
    `${urlApi}poll/create/`,
    data,
    {headers: { Authorization: localStorage.getItem('token') } }
  );
  setRenderMessage(true);
  window.location.reload();
};

  return (
    <div className='w-full h-auto'>
      <h1 className='text-gray-600 font-bold text-2xl'>Create new Poll:</h1>
        <form 
        className='flex flex-col'
        >
            <label className='text-xl text-teal-700 my-2 font-bold'>Poll Question: </label>
            <input className='rounded-md text-xl px-2 border-2 border-teal-700'
            type="text"
            onChange={pollQuestionHandler}
             />
         <h1 className='text-xl text-teal-700 my-2 font-bold'>Vote options:</h1>
         {itemsList.length !== 0 && itemsList.map((singleItem) => (
          <div className='w-full h-auto mb-5'>
            <SingleItem
            itemInfo={singleItem}
            itemsList={itemsList}
            setItemsList={setItemsList}
            />
          </div>
         ))}
         {checkPollItem && (
          <div className='w-full h-auto flex flex-col items-center'>
            <h1 className='text-teal-700 text-xl mb-1'>New vote option:</h1>
            <input
            className='w-full rounded-md text-xl px-2 border-2 border-teal-700'
            type="text"
            onChange={pollItemHandler}
            />
            <button
            className='p-1 px-4 text-xl text-center bg-teal-500 text-white font-bold w-1/2 rounded-md mt-2'
            onClick={doneVoteOption}
            type='button'
            >Create
            </button>
            {errItem !== '' && (
              <h1 className='text-lg text-red-600'>{errItem}</h1>
            )}
          </div>
         )}

         <button
         className='text-teal-700 underline font-bold text-xl my-4'
         onClick={() => setCheckPollItem(true)}
         disabled={checkPollItem}
         >Create a new Vote Option</button>
          <div className='w-full h-auto flex justify-center items-center mb-10'>
            <button className='w-[90%] h-auto p-3 bg-teal-500 text-white font-bold text-2xl rounded-md mt-3 focus:bg-white focus:border-2 focus:border-teal-500 focus:text-teal-500' onClick={createPollFunction} type="button">Create Poll</button>
          </div>
        </form>
        {renderErr && (
            <h1 className='text-lg text-red-600 font-bold text-center -mt-8 m-10'>{errMessage}</h1>
        )}
        {renderMessage && (
            <h1 className='text-lg text-teal-700 font-bold'>Poll Created!</h1>
        )}
    </div>
  )
};

