import React from 'react'

export default function AllPollsSection({ pollsInfo }) {
  return (
    <div>
        {pollsInfo.map((singlePoll) => (
            <div>
                <h1>{singlePoll.pollTitle}</h1>
                <h1>{singlePoll.createdAt}</h1>
            </div>
        ))}
    </div>
  )
}
