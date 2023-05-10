import myContext from "./myContext";
import React, { useState } from 'react';

export default function provider({ children }) {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [allItems, setAllItems] = useState([]);

const contextValue = {
  allItems,
  setAllItems
};

  return (
    <myContext.Provider value = { contextValue }>
      { children }
    </myContext.Provider> 
  )
}