import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { urlApi } from '../helpers/urlApi';
import { logoIcon } from '../icons/icons';
import SubmitButton from './common/SubmitButton';
import AOS from 'aos';
import 'aos/dist/aos.css'

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

    useEffect(() => {
        AOS.init({duration: 1300});
    }, []);

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
    <div className='w-full h-screen bg-slate-100'>
        {/* SMALL SCREEN COMPONENT */}
        <div className='w-full h-auto bg-slate-100 flex flex-col md:hidden'>
            {/* GREEN PART */}
            <div className='w-full h-[310px] bg-teal-500 flex flex-col justify-center items-center'>
                {/* TEXT AND LOGO */}
                <div className='w-auto h-auto flex flex-col justify-center items-center absolute -mt-[80px]' data-aos="fade-down">
                    <h1 className='text-white text-2xl font-bold mb-5'>Welcome to</h1>
                    <h1 className='text-white w-[80px] h-[80px] mb-2'>{logoIcon}</h1>
                    <h1 className='text-white text-4xl font-bold'>SITENAME</h1>
                </div>
            </div>
             {/* GRAY PART */}
            <div className='w-full h-[65%] bg-slate-100 flex flex-col items-center justify-start'>
                {/* SIGNUP TEXT */}
                <div className='w-auto h-auto flex flex-col items-center mt-8' data-aos="fade-right">
                    <h1 className='font-bold text-teal-800 text-4xl'>Sign up</h1>
                    <h1 className='font-bold text-teal-700 text-xl'>Create your account</h1>
                </div>
                {/* REGISTER FORM */}
                <div className='w-full h-auto px-5 mt-6' data-aos="fade-up">
                    <form className='flex flex-col text-lg' onSubmit={handleSubmit(submitForm)}>
                        <label className='text-teal-700 mb-1'>Email Adress:</label>
                        <input className='rounded-md text-lg px-2 border-2 border-teal-700' type="email" {...register('email')} />
                        {errors.email && <span className='text-red-700'>{errors.email.message}</span> }

                        <label className='text-teal-700 mb-1 mt-3'>Username:</label>
                        <input className='rounded-md text-lg px-2 border-2 border-teal-700' type="text" {...register('username')} />
                        {errors.username && <span className='text-red-700'>{errors.username.message}</span> }

                        <label className='text-teal-700 mb-1 mt-3'>Password:</label>
                        <input className='rounded-md text-lg px-2 border-2 border-teal-700' type="password" {...register('password')} />
                        {errors.password && <span className='text-red-700'>{errors.password.message}</span> }

                        {/* LOWER PORTION */}
                        <div className='w-full h-auto flex flex-col items-center mt-4'>
                            {renderMessage && (
                                <h1 className='text-teal-700 font-bold'>Account created!</h1>
                            )}
                            {errMessage !== '' && 
                                <h1 className='text-red-700'>{errMessage}</h1>
                            }
                            <SubmitButton text='Register'/>
                            <h1 className='text-center mt-2'>Already have an account? <span onClick={() => navigate('/login')} className='text-teal-500 cursor-pointer'>Sign in to your account.</span></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
};
