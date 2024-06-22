import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CookiesWrapper from "./components/wrapper/tool/Cookies";
import LanguageWrapper from "./components/wrapper/lang/Language";
import AxiosWrapper from "./components/wrapper/api/Api";
import {BrowserRouter} from "react-router-dom";
import PlayerWrapper from "./components/wrapper/player/Player";
import AxiosAppWrapper from "./components/wrapper/api/App";
import AccountWrapper from "./components/wrapper/account/Account";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <CookiesWrapper>
                <LanguageWrapper>
                    <AxiosWrapper>
                        <AccountWrapper>
                            <PlayerWrapper>
                                <AxiosAppWrapper>
                                    <App />
                                </AxiosAppWrapper>
                            </PlayerWrapper>
                        </AccountWrapper>
                    </AxiosWrapper>
                </LanguageWrapper>
            </CookiesWrapper>
        </BrowserRouter>
    </React.StrictMode>
)
