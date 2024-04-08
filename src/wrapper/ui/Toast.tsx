import {createContext, useState} from 'react';

export const ToastContext = createContext(null);

export default function ToastWrapper({ children }) {
    const [list, setList] = useState([]);

    const clear = () => {
        setList([]);
    }

    const remove = (id: string) => {
        setList(list.filter(({ id: current }) => current !== id));
    }

    const add = (title: string, type: any) => {
        const toast = { date: Date.now(), title, type };

        setList([...list, toast]);

        setTimeout(() => {
            remove(toast);
        }, 3000);
    }

    return (
        <ToastContext.Provider value={{ clear, list, setList }}>
            {children}
        </ToastContext.Provider>
    );
}
