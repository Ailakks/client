import {createContext, useContext} from 'react';
import {CookiesContext} from "./Cookies";
import axios from "axios";

export const AxiosContext = createContext(null);

export default function AxiosWrapper({ children }) {
    const { getToken } = useContext(CookiesContext);

    const axiosClient = axios.create({
        baseURL: import.meta.env.VITE_API_REST_BASE_URL,
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
