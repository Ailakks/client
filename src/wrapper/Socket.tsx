import {createContext, useContext} from 'react';
import {CookiesContext} from "./tool/Cookies";

export const SocketContext = createContext(null);

export default function SocketWrapper({ children }) {
    const { getToken } = useContext(CookiesContext);

    const socket = io(import.meta.env.VITE_API_SOCKET_URL, { extraHeaders: { Authorization: `Bearer ${getToken()}` } });

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
