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
import LanguageWrapper from "./wrapper/lang/LanguageWrapper";
import ErrorBoundaryWrapper from "./components/native/ErrorBoundaryWrapper";
import ModalProvider from "./wrapper/ui/Modal";
import PopupProvider from "./wrapper/ui/Popup";
import SocketWrapper from "./wrapper/Socket";
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
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
                                    </SocketWrapper>
                                </ApolloWrapper>
                            </AxiosWrapper>
                        </DownloadWrapper>
                    </ErrorBoundaryWrapper>
                </LanguageWrapper>
            </CookiesWrapper>
        </BrowserRouter>
    </NextUIProvider>
)
