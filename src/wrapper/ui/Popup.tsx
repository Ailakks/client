import {createContext, useState} from 'react';

export const PopupContext = createContext(null);

export default function PopupWrapper({ children }) {
    const [current, setCurrent] = useState(null);

    const close = () => {
        setCurrent(null);
    }

    return (
        <PopupContext.Provider value={{ current, setCurrent, close }}>
            {children}
        </PopupContext.Provider>
    );
}
