import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CookiesWrapper from "./components/wrapper/tool/Cookies";
import LanguageWrapper from "./components/wrapper/lang/Language";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CookiesWrapper>
            <LanguageWrapper>
                <App />
            </LanguageWrapper>
        </CookiesWrapper>
    </React.StrictMode>
)
