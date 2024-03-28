import {createContext} from 'react';
import cookie from 'react-cookies';

export const CookiesContext = createContext(null);

export default function CookiesWrapper({ children }) {
    const setCookie = (name, value) => {
        cookie.save(name, value, { path: "/" });
    };

    const removeCookie = (name) => {
        cookie.remove(name, { path: "/" });
    };

    const getCookie = (name) => {
        return cookie.load(name);
    };

    const setToken = (value) => {
        setCookie('token', value);
    };

    const removeToken = () => {
        removeCookie('token');
    };

    const getToken = () => getCookie("token");

    const hasToken = getToken() !== undefined;

    return (
        <CookiesContext.Provider value={{ setCookie, removeCookie, getCookie, setToken, removeToken, getToken, hasToken }}>
            {children}
        </CookiesContext.Provider>
    );
}
