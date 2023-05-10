import React, { useState } from 'react'


export default function SingleItem({ itemTitle, itemsList, setItemsList }) {

  const deleteButtonFunction = () => {
    const filterTitle = itemsList.filter((singleItem) => singleItem.itemTitle !== itemTitle);
    setItemsList(filterTitle);
  };

  return (
    <div>
        <h1>{ itemTitle }</h1>
        <button>Edit</button>
        <button onClick={deleteButtonFunction}>Delete</button>
    </div>
  )
};
