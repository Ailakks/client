import {Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./components/page/HomePage";
import AuthLayout from "./components/layout/auth/Auth";
import Login from "./components/page/auth/Login";
import AppLayout from "./components/layout/app/App";
import Key from "./components/page/auth/Key";
import Logout from "./components/page/auth/Logout";
import FolderPage from "./components/page/FolderPage";
import Trash from "./components/page/Trash";
import NotFoundFallback from "./components/page/fallback/NotFoundFallback";
import PricingPage from "./components/page/PricingPage";
import Signup from "./components/page/auth/Signup";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />

            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
            <Route path="/logout" element={<AuthLayout><Logout /></AuthLayout>} />

            <Route path="/*" element={<AuthLayout><NotFoundFallback /></AuthLayout>} />
        </Routes>
    )
}
