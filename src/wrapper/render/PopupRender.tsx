import {createContext, useState} from 'react';

export const PopupContext = createContext(null);

export default function PopupRender({ children }) {
    const [popup, setPopup] = useState(null);

    const close = () => {
        setPopup(null);
    }

    return (
        <PopupContext.Provider value={{ setPopup, close }}>
            {popup}
            {children}
        </PopupContext.Provider>
    );
}
