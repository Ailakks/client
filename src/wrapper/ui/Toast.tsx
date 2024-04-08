import {createContext, useState} from 'react';

export const ToastContext = createContext(null);

export const ToastType = {
    DONE: { code: 200, title: 'Ok', type: 'ok' },
    CREATED: { code: 201, title: 'Done', type: 'created' },
    ERROR: { code: 500, title: 'Something went wrong', type: 'error' },
    NOT_FOUND: { code: 404, title: 'That could not be found', type: 'error' }
};

export default function ToastWrapper({ children }) {
    const [list, setList] = useState([]);

    const handle = (error: any) => {
        if (!error.response) {
            return;
        }

        const { response: { status } } = error;

        const { title, type } = Object.values(ToastType).find(({ code }) => code === status) ?? ToastType.ERROR;

        add(title, type);
    };

    const clear = () => {
        setList([]);
    }

    const remove = (id: string) => {
        setList(list.filter(({ id: current }) => current !== id));
    }

    const add = (type: ToastType, title: string) => {
        const toast = { date: Date.now(), type, title };

        setList([...list, toast]);

        setTimeout(() => {
            remove(toast);
        }, 60000);
    }

    return (
        <ToastContext.Provider value={{ add, remove, clear, handle, list, setList }}>
            {children}
        </ToastContext.Provider>
    );
}
