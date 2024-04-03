import React, { createContext, useContext, useState } from 'react';

// Step 1: Define Context Type
interface MyContextType {
  value: object;
  setValue: React.Dispatch<React.SetStateAction<object>>;
}

interface ValueProps {
  title: string;
  source: string;
  url: string,
  videoDesc: object,
}
// Step 2: Create Context
const MyContext = createContext<MyContextType | undefined>(undefined);

// Step 3: Create Provider
export const MyProvider= ({ children }) => {
  const [value, setValue] = useState<ValueProps | {}>({});
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Step 4: Use Context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
