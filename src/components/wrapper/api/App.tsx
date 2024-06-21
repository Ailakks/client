import {createContext, useContext} from 'react';
import {CookiesContext} from "../tool/Cookies";
import axios from "axios";
import {makeUseAxios} from "axios-hooks";

export const AxiosAppContext = createContext(null);

export default function AxiosAppWrapper({ children }) {
    const { getToken } = useContext(CookiesContext);

    const client = axios.create({
        baseURL: import.meta.env.VITE_API_REST_APP_URL,
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
    });

    const useClient = makeUseAxios({
        axios: client,
    });

    return (
        <AxiosAppContext.Provider value={{ client, useClient }}>
            {children}
        </AxiosAppContext.Provider>
    );
}
