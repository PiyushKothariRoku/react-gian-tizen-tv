import React from 'react';
interface MyContextType {
    value: object;
    setValue: React.Dispatch<React.SetStateAction<object>>;
}
export declare const MyProvider: ({ children }: {
    children: any;
}) => React.JSX.Element;
export declare const useMyContext: () => MyContextType;
export {};
