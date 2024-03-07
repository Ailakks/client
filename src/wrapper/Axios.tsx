import {createContext, useContext} from 'react';
import {CookiesContext} from "./Cookies";
import axios from "axios";

export const AxiosContext = createContext(null);

export default function AxiosWrapper({ children }) {
    const { getToken } = useContext(CookiesContext);

    const axiosClient = axios.create({
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
    });

    return (
        <AxiosContext.Provider value={{ axiosClient }}>
            {children}
        </AxiosContext.Provider>
    );
}
