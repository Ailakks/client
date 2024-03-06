import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ApolloWrapper from "./wrapper/Apollo";
import AccountWrapper from "./wrapper/Account";
import LoggedWrapper from "./wrapper/Logged";
import PopupRender from "./wrapper/render/PopupRender";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ApolloWrapper>
            <AccountWrapper>
                <LoggedWrapper>
                    <PopupRender>
                        <App />
                    </PopupRender>
                </LoggedWrapper>
            </AccountWrapper>
        </ApolloWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
