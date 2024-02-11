import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./components/page/Home";
import AuthLayout from "./components/layout/auth/Auth";
import Login from "./components/page/auth/Login";
import AppLayout from "./components/layout/app/App";
import SessionKey from "./components/page/auth/SessionKey";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<AppLayout><Home /></AppLayout>} />

            <Route path="/auth/key" element={<AuthLayout><SessionKey /></AuthLayout>} />

            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        </Routes>
    )
}
