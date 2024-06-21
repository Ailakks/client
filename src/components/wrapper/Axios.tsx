import {createContext, useContext} from 'react';
import {CookiesContext} from "./tool/Cookies";
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

    const uploadClient = axios.create({
        ...client.defaults,
        timeout: -1,
        headers: {
            ...client.defaults.headers,
            "Content-Type": "multipart/form-data"
        },
    });

    const useClient = makeUseAxios({
        axios: client,
    });

    return (
        <AxiosContext.Provider value={{ useClient, client, uploadClient }}>
            {children}
        </AxiosContext.Provider>
    );
}
