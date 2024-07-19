import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import CookiesWrapper from "./components/wrapper/tool/Cookies";
import AxiosWrapper from "./components/wrapper/api/Api";
import PlayerWrapper from "./components/wrapper/player/Player";
import AccountWrapper from "./components/wrapper/account/Account";
import LanguageWrapper from "./components/wrapper/api/Language";
import AppWrapper from "./components/wrapper/app/App";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <CookiesWrapper>
                <LanguageWrapper>
                    <AxiosWrapper>
                        <AccountWrapper>
                           <AppWrapper>
                               <PlayerWrapper>
                                   <App />
                               </PlayerWrapper>
                           </AppWrapper>
                        </AccountWrapper>
                    </AxiosWrapper>
                </LanguageWrapper>
            </CookiesWrapper>
        </BrowserRouter>
    </React.StrictMode>
)
