import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import cookie from 'react-cookies';
import ApolloWrapper from "./wrapper/Apollo";
import AccountWrapper from "./wrapper/Account";

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ApolloWrapper>
            <AccountWrapper>
                <App />
            </AccountWrapper>
        </ApolloWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
