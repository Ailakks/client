import {createContext, useState} from 'react';

export const ModalContext = createContext(null);

export default function ModalWrapper({ children }) {
    const [current, setCurrent] = useState(null);

    const close = () => {
        setCurrent(null);
    }

    return (
        <ModalContext.Provider value={{ current, setCurrent, close }}>
            {children}
        </ModalContext.Provider>
    );
}
