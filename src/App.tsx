import {Route, Routes, useLocation} from "react-router-dom";
import AppLayout from "./components/view/FullLayout";
import Home from "./components/page/Home";
import AuthLayout from "./components/layout/auth/Auth";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<AppLayout><Home /></AppLayout>} />

            <Route path="/login" element={<AuthLayout><Home /></AuthLayout>} />
        </Routes>
    )
}
