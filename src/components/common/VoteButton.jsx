import React from 'react'

export default function VoteButton({ func, text }) {
  return (
    <button className='' onClick={func}>{ text }</button>
  )
}
