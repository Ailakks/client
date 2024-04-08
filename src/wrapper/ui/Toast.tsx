import {createContext, useState} from 'react';

export const ToastContext = createContext(null);

export default function ToastWrapper({ children }) {
    const [list, setList] = useState([]);

    const clear = () => {
        setList([]);
    }

    return (
        <ToastContext.Provider value={{ clear, list, setList }}>
            {children}
        </ToastContext.Provider>
    );
}
