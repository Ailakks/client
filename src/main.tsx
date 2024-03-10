import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ApolloWrapper from "./wrapper/Apollo";
import AccountWrapper from "./wrapper/Account";
import LoggedWrapper from "./wrapper/Logged";
import PopupProvider from "./wrapper/ui/PopupProvider";
import CookiesWrapper from "./wrapper/tool/Cookies";
import AxiosWrapper from "./wrapper/Axios";
import RenderProvider from "./wrapper/Render";
import DownloadWrapper from "./wrapper/tool/Download";
import ModalProvider from "./wrapper/ui/ModalProvider";
import QueueWrapper from "./wrapper/api/Queue";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <CookiesWrapper>
            <DownloadWrapper>
                <AxiosWrapper>
                    <ApolloWrapper>
                        <AccountWrapper>
                            <LoggedWrapper>
                                <PopupProvider>
                                    <ModalProvider>
                                        <QueueWrapper>
                                            <RenderProvider>
                                                <App />
                                            </RenderProvider>
                                        </QueueWrapper>
                                    </ModalProvider>
                                </PopupProvider>
                            </LoggedWrapper>
                        </AccountWrapper>
                    </ApolloWrapper>
                </AxiosWrapper>
            </DownloadWrapper>
        </CookiesWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
