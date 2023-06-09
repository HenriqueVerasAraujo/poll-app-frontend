import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { urlApi } from '../helpers/urlApi';
import { logoIcon } from '../icons/icons';
import SubmitButton from './common/SubmitButton';
import AOS from 'aos';
import 'aos/dist/aos.css'


export default function LoginForm() {
    const navigate = useNavigate(); 
   const [errMessage, setErrMessage] = useState('');

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
        setErrMessage('');
        const check = await axios.post(`${urlApi}user/login`, data);
        if (check.data.token) {
            localStorage.setItem('token', check.data.token);
            localStorage.setItem('userId', check.data.userId);
            navigate('/user');
        } else{
            setErrMessage(check.data.errMessage);
        };
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/user');
        }
        AOS.init({duration: 1300});
    }, []);

  return (
      <div className='w-full h-screen bg-slate-100'>
        {/* SMALL SCREEN COMPONENT */}
        <div className='w-full h-auto bg-slate-100 flex flex-col md:hidden'>
            {/* GREEN PART */}
            <div className='w-full h-[310px] bg-teal-500 flex flex-col justify-center items-center'>
                {/* TEXT AND LOGO */}
                <div className='w-auto h-auto flex flex-col justify-center items-center absolute -mt-[80px]' data-aos="fade-down">
                    <h1 className='text-white text-2xl font-bold mb-5'>Welcome back!</h1>
                    <h1 className='text-white w-[80px] h-[80px] mb-2'>{logoIcon}</h1>
                    <h1 className='text-white text-4xl font-bold'>SITENAME</h1>
                </div>
            </div>
            {/* GRAY PART */}
            <div className='w-full h-[65%] bg-slate-100 flex flex-col items-center justify-start'>
                {/* SIGNUP TEXT */}
                <div className='w-auto h-auto flex flex-col items-center mt-8' data-aos="fade-right">
                    <h1 className='font-bold text-teal-800 text-4xl'>Sign in</h1>
                    <h1 className='font-bold text-teal-700 text-xl'>Access your account</h1>
                </div>
            </div>
            
            {/* LOGIN FORM */}
            <div className='w-full h-auto px-5 mt-6' data-aos="fade-up">
                <form className='flex flex-col text-lg' onSubmit={handleSubmit(submitForm)}>
                    <label className='text-teal-700 mb-1'>Email Address:</label>
                    <input className='rounded-md text-lg px-2 border-2 border-teal-700'type="email" {...register('email')} />
                    {errors.email && <span className='text-red-700'>{errors.email.message}</span> }

                    <label className='text-teal-700 mb-1 mt-3'>Password:</label>
                    <input className='rounded-md text-lg px-2 border-2 border-teal-700' type="password" {...register('password')} />
                    {errors.password && <span className='text-red-700'>{errors.password.message}</span> }

                    {/* LOWER PORTION  */}
                    <div className='w-full h-auto flex flex-col items-center mt-4'>
                        {errMessage !== '' && 
                            <h1 className='text-red-700'>{errMessage}</h1>
                        }
                        <SubmitButton text='Login'/>
                        <h1 className='text-center mt-2'>Don't have an account? <span onClick={() => navigate('/register')} className='text-teal-500 cursor-pointer'>Create a new account.</span></h1>
                    </div>
                </form>
            </div>
        </div>

    </div>
  )
};
