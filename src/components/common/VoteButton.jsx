import React from 'react'

export default function VoteButton({ func, text }) {
  return (
    <button
    type='button'
    onClick={ func }
    className='w-[70%] h-auto p-3 bg-teal-500 text-white font-bold text-2xl rounded-md mt-3 focus:bg-white focus:border-2 focus:border-teal-500 focus:text-teal-500'
    >{ text }
    </button>
  )
}
