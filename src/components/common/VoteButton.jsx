import React from 'react'

export default function VoteButton({ func, text }) {
  return (
    <button onClick={func}>{ text }</button>
  )
}
