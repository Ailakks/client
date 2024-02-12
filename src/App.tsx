import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./components/page/Home";
import AuthLayout from "./components/layout/auth/Auth";
import Login from "./components/page/auth/Login";
import AppLayout from "./components/layout/app/App";
import Key from "./components/page/auth/Key";
import Logout from "./components/page/auth/Logout";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<AppLayout><Home /></AppLayout>} />

            <Route path="/key" element={<AuthLayout><Key /></AuthLayout>} />
            <Route path="/logout" element={<AuthLayout><Logout /></AuthLayout>} />

            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        </Routes>
    )
}
