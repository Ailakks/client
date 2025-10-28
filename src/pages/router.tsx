import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/login";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
