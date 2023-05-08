import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { urlApi } from '../helpers/urlApi';

export default function RegisterForm() {
    const navigate = useNavigate();

    const [errMessage, setErrMessage] = useState('');
    const [renderMessage, setRenderMessage] = useState(false);

    const schema = z
    .object({
        username: z.string().min(5).max(20),
        email: z.string().email(),
        password: z.string().min(5).max(20),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema) 
    });

    const submitForm = async(data) => {
        setRenderMessage(false);
        setErrMessage('');
        const check = await axios.post(`${urlApi}user/create`, data)
        console.log(check.data);
        if (check.data.message) {
            setRenderMessage(true);
        } else {
            setErrMessage(check.data.errMessage);
        };
    };

  return (
    <div className=''>
        <form className='flex flex-col' onSubmit={handleSubmit(submitForm)}>
            <label>Email: </label>
            <input type="email" {...register('email')} />
            {errors.email && <span>{errors.email.message}</span> }

            <label>Username: </label>
            <input type="text" {...register('username')} />
            {errors.username && <span>{errors.username.message}</span> }

            <label>Password: </label>
            <input type="password" {...register('password')} />
            {errors.password && <span>{errors.password.message}</span> }
            {errMessage !== '' && 
                <h1>{errMessage}</h1>
            }

            <button type="submit">Register</button>
        </form>
        {renderMessage && (
            <h1>Account created!</h1>
        )}
    </div>
  )
};
