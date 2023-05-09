import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { urlApi } from '../helpers/urlApi';


export default function NewPollForm() {
  const navigate = useNavigate();

    const [errMessage, setErrMessage] = useState('');
    const [pollTitle, setPollTitle] = useState('');
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

}

// const verifyForm = () => {
//   if (pollTitle.length < 1) {
//     setErrMessage('Your Poll Question must be at least 2 characters long.')
//   }
// };

  return (
    <div className=''>
        <form className='flex flex-col'>
            <label>Poll Question: </label>
            <input 
            type="text"
            onChange={pollQuestionHandler}
             />
         

            {errMessage !== '' && 
                <h1>{errMessage}</h1>
            }
            <button type="submit">Create Poll</button>
        </form>
        {renderMessage && (
            <h1>Account created!</h1>
        )}
    </div>
  )
};
