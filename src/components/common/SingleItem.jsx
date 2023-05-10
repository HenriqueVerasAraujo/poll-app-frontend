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
    <div>
      {editing ? (
        <div>
          <input type="text" onChange={handleChange} value={itemText} />
          <button type='button' onClick={handleClick}>Confirm</button>
        </div>
      ) : (
        <div>
          <h1>{ itemInfo.itemTitle}</h1>
          <button type='button' onClick={editButtonFunction}>Edit</button>
          <button type='button' onClick={deleteButtonFunction}>Delete</button>
        </div>
      )}
    </div>
  )
};
