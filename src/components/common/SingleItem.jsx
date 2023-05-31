import React, { useState } from 'react'


export default function SingleItem({ itemInfo, itemsList, setItemsList }) {
  const [editing, setEditing] = useState(false);
  const [itemText, setItemText] = useState(itemInfo.itemTitle);

  const handleClick = () => {
    const findIndex = itemsList.findIndex((singleItem) => singleItem.itemId === itemInfo.itemId);
    itemsList[findIndex].itemTitle = itemText;
    setItemsList(itemsList);
    setEditing(false);
  };

  const handleChange = ({ target }) => {
    setItemText(target.value);
  };

  const editButtonFunction = () => {
    setEditing(true);
  };

  const deleteButtonFunction = () => {
    const filterId = itemsList.filter((singleItem) => singleItem.itemId !== itemInfo.itemId);
    setItemsList(filterId);
  };

  return (
    <div className='w-full h-auto'>
      {editing ? (
        <div className='w-full h-auto flex flex-col justify-center items-center'>
          <input type="text" className='w-full rounded-md text-xl px-2 border-2 border-teal-700' onChange={handleChange} value={itemText} />
          <button type='button' className='p-1 px-4 text-xl text-center bg-teal-500 text-white font-bold w-1/2 rounded-md mt-2' onClick={handleClick}>Confirm</button>
        </div>
      ) : (
        <div className='w-full h-auto flex flex-col justify-center items-center'>
          <div className='w-full h-auto truncate... break-words overflow-hidden bg-slate-300 rounded-md p-2'>
            <h1 className='text-lg text-gray-700 truncate... break-words overflow-hidden font-bold'>{ itemInfo.itemTitle }</h1>
          </div>
          <div className='w-full h-auto flex justify-center mt-2'>
            <button className='p-1 px-4 text-xl text-center bg-teal-500 text-white font-bold rounded-md' type='button' onClick={editButtonFunction}>Edit</button>
            <button className='ml-2 p-1 px-4 text-xl bg-black text-white font-bold rounded-md' type='button' onClick={deleteButtonFunction}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
};
