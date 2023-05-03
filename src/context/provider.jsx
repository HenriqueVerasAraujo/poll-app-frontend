import myContext from "./myContext";
import React, { useState } from 'react';

export default function provider({ children }) {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [test, setTest] = useState('initial Value');

const contextValue = {
  test,
  setTest,
};

  return (
    <myContext.Provider value = { contextValue }>
      { children }
    </myContext.Provider> 
  )
}