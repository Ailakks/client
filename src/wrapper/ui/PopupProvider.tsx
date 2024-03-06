import {createContext, useState} from 'react';

export const PopupContext = createContext(null);

export default function PopupProvider({ children }) {
    const [popup, setPopup] = useState(null);

    const close = () => {
        setPopup(null);
    }

    return (
        <PopupContext.Provider value={{ popup, setPopup, close }}>
            {children}
        </PopupContext.Provider>
    );
}
