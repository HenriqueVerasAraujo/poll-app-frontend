import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

    const submitForm = (data) => {
        navigate('/deu-certo')
        console.log('worked', data);
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

            <input type="submit" /> Login
        </form>
    </div>
  )
};
