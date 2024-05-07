import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ApolloWrapper from "./wrapper/Apollo";
import AccountWrapper from "./wrapper/api/Account";
import LoggedWrapper from "./wrapper/Logged";
import CookiesWrapper from "./wrapper/tool/Cookies";
import AxiosWrapper from "./wrapper/Axios";
import RenderProvider from "./wrapper/Render";
import DownloadWrapper from "./wrapper/tool/Download";
import QueueWrapper from "./wrapper/api/Queue";
import LanguageWrapper from "./wrapper/lang/Language";
import ErrorBoundaryWrapper from "./components/native/ErrorBoundaryWrapper";
import ModalWrapper from "./wrapper/ui/Modal";
import PopupWrapper from "./wrapper/ui/Popup";
import SocketWrapper from "./wrapper/Socket";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <CookiesWrapper>
            <LanguageWrapper>
                <ErrorBoundaryWrapper>
                    <DownloadWrapper>
                        <AxiosWrapper>
                            <ApolloWrapper>
                                <SocketWrapper>
                                    <AccountWrapper>
                                        <LoggedWrapper>
                                            <PopupWrapper>
                                                <ModalWrapper>
                                                    <QueueWrapper>
                                                        <RenderProvider>
                                                            <App />
                                                        </RenderProvider>
                                                    </QueueWrapper>
                                                </ModalWrapper>
                                            </PopupWrapper>
                                        </LoggedWrapper>
                                    </AccountWrapper>
                                </SocketWrapper>
                            </ApolloWrapper>
                        </AxiosWrapper>
                    </DownloadWrapper>
                </ErrorBoundaryWrapper>
            </LanguageWrapper>
        </CookiesWrapper>
    </BrowserRouter>
)
