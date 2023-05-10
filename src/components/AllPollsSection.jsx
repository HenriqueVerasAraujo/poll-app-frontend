import React, { useState, useEffect } from 'react'
import SinglePoll from './common/SinglePoll';

export default function AllPollsSection({ pollsInfo }) {
  const [renderButton, setRenderButton] = useState(false);

  useEffect(() => {
    verifyUserId();
  }, []);
  
  const verifyUserId = () => {
    const userIdFromLocal = localStorage.getItem('userId');
    if (!userIdFromLocal) {
      return setRenderButton(false);
    };
    if (userIdFromLocal === pollsInfo.userId) {
      setRenderButton(true);
    } else {
      setRenderButton(false);
    };
  };

  return (
    <div>
        {pollsInfo.map((singlePoll) => (
            <div>
              <SinglePoll pollInfo={singlePoll} />
                <h1>{singlePoll.pollTitle}</h1>
                <h1>{singlePoll.createdAt}</h1>
            </div>
        ))}
    </div>
  )
};
