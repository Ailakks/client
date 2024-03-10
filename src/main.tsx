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
import UploadWrapper from "./wrapper/api/Upload";

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
                                    <RenderProvider>
                                        <UploadWrapper>
                                            <App />
                                        </UploadWrapper>
                                    </RenderProvider>
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
