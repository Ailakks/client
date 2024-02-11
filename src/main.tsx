import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ApolloWrapper from "./wrapper/Apollo";
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ApolloWrapper>
            <App />
        </ApolloWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
