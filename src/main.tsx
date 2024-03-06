import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ApolloWrapper from "./wrapper/Apollo";
import AccountWrapper from "./wrapper/Account";
import LoggedWrapper from "./wrapper/Logged";
import PopupProvider from "./wrapper/ui/PopupProvider";

import cookie from 'react-cookies';

export const setCookie = (name, value) => {
    cookie.save(name, value, { path: "/" });
};

export const removeCookie = (name) => {
    cookie.remove(name, { path: "/" });
};

export const setToken = (value) => {
    setCookie('token', value);
};

export const removeToken = () => {
    removeCookie('token');
};

export const getToken = () => cookie.load('token');

export const hasToken = getToken() !== undefined;

export const ApiClient = axios.create({
    headers: {
        'Authorization': `Bearer ${getToken()}`
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ApolloWrapper>
            <AccountWrapper>
                <LoggedWrapper>
                    <PopupProvider>
                        <App />
                    </PopupProvider>
                </LoggedWrapper>
            </AccountWrapper>
        </ApolloWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
