import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CookiesWrapper from "./components/wrapper/tool/Cookies";
import LanguageWrapper from "./components/wrapper/lang/Language";
import AxiosWrapper from "./components/wrapper/Axios";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <CookiesWrapper>
                <LanguageWrapper>
                    <AxiosWrapper>
                        <App />
                    </AxiosWrapper>
                </LanguageWrapper>
            </CookiesWrapper>
        </BrowserRouter>
    </React.StrictMode>
)
