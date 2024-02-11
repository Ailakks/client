import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import ApolloWrapper from "./wrapper/Apollo";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ApolloWrapper>
            <App />
        </ApolloWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
