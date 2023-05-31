import React from 'react'
import { workIcon } from '../icons/icons'
import Navbar from '../components/Navbar'

export default function AboutPage() {
  return (
    <div className='w-full h-screen bg-slate-100'>
        <Navbar />
        <div className='w-full h-screen pt-[70px] flex flex-col justify-center items-center'>
            <h1 className='text-gray-600 font-bold text-4xl'>Sorry!</h1>
            <h1>{workIcon}</h1>
            <h1 className='text-gray-600 font-bold text-4xl'>Page under </h1>
            <h1 className='text-gray-600 font-bold text-4xl'>construction.</h1>
        </div>
    </div>
  )
}
