import React, { useState, useEffect } from 'react'
import { menuIcon, closeIcon } from '../icons/icons';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const [openNav, setOpenNav] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    const buttonsFree = [
        {name:'Register', to: '/register'},
        {name:'Login', to: '/login'},
        {name:'About', to: '/about'},
    ];

    const buttonsAccount = [
        {name:'My Polls', to: '/user'},
        {name:'Logout', to: '/login'},
        {name:'About', to: '/about'},
    ];

    const verifyLogin = () => {
        const checkToken = localStorage.getItem('token');
        if(checkToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    useEffect(() => {
        verifyLogin();
    }, []);

  return (
    <div className='w-full h-[9%] sm:h-[6%] bg-teal-500 flex flex-col justify-center items-center sm:justify-center fixed top-0 left-0 shadow-md'>
        <div className='w-full h-full flex items-center relative sm:justify-between'>
            {/* SITE NAME */}
            <div className='w-full h-full sm:w-auto sm:pl-10 flex items-center justify-center'>
                <h1 className='font-bold text-white text-4xl sm:text-4xl'>SiteName</h1>
            </div>
            {/* HAMBUGER MENU BUTTONS */}
            <div className='text-2xl flex items-center sm:hidden absolute right-5'>
                {openNav ? (
                    <button onClick={() => setOpenNav(!openNav)}>{menuIcon}</button>
                ) : (
                    <button onClick={() => setOpenNav(!openNav)}>{closeIcon}</button>
                )}
            </div>
            {/* NAV BUTTONS BIG SCREEN */}
            <div className='hidden sm:w-auto sm:h-auto sm:flex pr-10 text-2xl text-white font-bold'>
                {loggedIn ? (
                    buttonsAccount.map((singleButton) => (
                        <div className='w-auto h-auto pl-7'>
                            <button type='button' onClick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                        </div>
                    ))
                ):(
                    buttonsFree.map((singleButton) => (
                        <div>
                            <button type='button' onCLick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                        </div>
                    ))
                )}
            </div>
        </div>
        {/* NAV BUTTONS SMALL SCREEN */}
        {openNav && (
            <div className='w-full h-auto bg-white'>
                {loggedIn ? (
                buttonsAccount.map((singleButton) => (
                    <div className='w-auto h-auto pl-7'>
                        <button type='button' onClick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                    </div>
                ))
            ):(
                buttonsFree.map((singleButton) => (
                    <div>
                        <button type='button' onCLick={() => navigate(`${singleButton.to}`)}>{singleButton.name}</button>
                    </div>
                ))
            )}
                
            </div>
        )}
    </div>
  )
};