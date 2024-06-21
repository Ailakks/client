import {createContext, useContext} from 'react';
import {CookiesContext} from "../tool/Cookies";
import axios from "axios";
import {makeUseAxios} from "axios-hooks";

export const AxiosContext = createContext(null);

export default function AxiosWrapper({ children }) {
    const { getToken } = useContext(CookiesContext);

    const client = axios.create({
        baseURL: import.meta.env.VITE_API_REST_BASE_URL,
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
    });

    const useClient = makeUseAxios({
        axios: client,
    });

    return (
        <AxiosContext.Provider value={{ client, useClient }}>
            {children}
        </AxiosContext.Provider>
    );
}
