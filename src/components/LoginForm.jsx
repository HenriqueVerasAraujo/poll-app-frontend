import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { urlApi } from '../helpers/urlApi';

export default function LoginForm() {
    const navigate = useNavigate();

    const schema = z
    .object({
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
        const check = await axios.post(`${urlApi}user/login`, data);
        if (check.data.token) {
            localStorage.setItem('token', check.data.token);
        };
    };

  return (
    <div className=''>
        <form className='flex flex-col' onSubmit={handleSubmit(submitForm)}>
            <label>Email: </label>
            <input type="email" {...register('email')} />
            {errors.email && <span>{errors.email.message}</span> }

            <label>Password: </label>
            <input type="password" {...register('password')} />
            {errors.password && <span>{errors.password.message}</span> }

            <button type="submit">Register</button>
        </form>
    </div>
  )
};
