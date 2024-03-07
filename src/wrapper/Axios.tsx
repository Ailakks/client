import {createContext, useContext} from 'react';
import {CookiesContext} from "./Cookies";

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
