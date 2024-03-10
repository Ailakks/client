import {createContext, useState} from 'react';

export const PopupContext = createContext(null);

export default function PopupProvider({ children }) {
    const [current, setCurrent] = useState(null);

    const close = () => {
        setCurrent(null);
    }

    return (
        <PopupContext.Provider value={{ popup: current, setPopup: setCurrent, close }}>
            {children}
        </PopupContext.Provider>
    );
}
