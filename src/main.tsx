import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ApolloWrapper from "./wrapper/Apollo";
import AccountWrapper from "./wrapper/Account";
import LoggedWrapper from "./wrapper/Logged";
import PopupProvider from "./wrapper/ui/PopupProvider";
import CookiesWrapper from "./wrapper/Cookies";
import AxiosWrapper from "./wrapper/Axios";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <CookiesWrapper>
            <AxiosWrapper>
                <ApolloWrapper>
                    <AccountWrapper>
                        <LoggedWrapper>
                            <PopupProvider>
                                <App />
                            </PopupProvider>
                        </LoggedWrapper>
                    </AccountWrapper>
                </ApolloWrapper>
            </AxiosWrapper>
        </CookiesWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
