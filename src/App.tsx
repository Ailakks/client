import {Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "./components/page/dash/Dashboard";
import AuthLayout from "./components/layout/auth/Auth";
import Login from "./components/page/auth/Login";
import Logout from "./components/page/auth/Logout";
import NotFoundFallback from "./components/page/fallback/NotFoundFallback";
import Signup from "./components/page/auth/Signup";
import DashLayout from "./components/layout/dash/Dash";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<DashLayout><Dashboard /></DashLayout>} />

            <Route path="/login" element={<DashLayout><Login /></DashLayout>} />
            <Route path="/signup" element={<DashLayout><Signup /></DashLayout>} />
            <Route path="/logout" element={<DashLayout><Logout /></DashLayout>} />

            <Route path="/*" element={<DashLayout><NotFoundFallback /></DashLayout>} />
        </Routes>
    )
}
