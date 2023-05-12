import React from 'react'

export default function SubmitButton({ text }) {
  return (
    <button className='w-[90%] h-auto p-3 bg-teal-500 text-white font-bold text-2xl rounded-md mt-3 focus:bg-white focus:border-2 focus:border-teal-500 focus:text-teal-500' type="submit">{text}</button>
  )
}
