import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ApolloWrapper from "./wrapper/Apollo";
import AccountWrapper from "./wrapper/Account";
import LoggedWrapper from "./wrapper/Logged";
import PopupWrapper from "./wrapper/ui/Popup";
import CookiesWrapper from "./wrapper/tool/Cookies";
import AxiosWrapper from "./wrapper/Axios";
import RenderProvider from "./wrapper/Render";
import DownloadWrapper from "./wrapper/tool/Download";
import ModalWrapper from "./wrapper/ui/Modal";
import QueueWrapper from "./wrapper/api/Queue";
import LanguageWrapper from "./wrapper/lang/LanguageWrapper";
import ErrorBoundaryWrapper from "./components/native/ErrorBoundaryWrapper";
import ToastWrapper from "./wrapper/ui/Toast";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <CookiesWrapper>
              <LanguageWrapper>
                  <ErrorBoundaryWrapper>
                      <DownloadWrapper>
                          <AxiosWrapper>
                              <ApolloWrapper>
                                  <AccountWrapper>
                                      <LoggedWrapper>
                                          <PopupWrapper>
                                              <ToastWrapper>
                                                  <ModalWrapper>
                                                      <QueueWrapper>
                                                          <RenderProvider>
                                                              <App />
                                                          </RenderProvider>
                                                      </QueueWrapper>
                                                  </ModalWrapper>
                                              </ToastWrapper>
                                          </PopupWrapper>
                                      </LoggedWrapper>
                                  </AccountWrapper>
                              </ApolloWrapper>
                          </AxiosWrapper>
                      </DownloadWrapper>
                  </ErrorBoundaryWrapper>
              </LanguageWrapper>
          </CookiesWrapper>
      </BrowserRouter>
  </React.StrictMode>,
)
