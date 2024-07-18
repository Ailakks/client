import Layout from "./components/layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";
import {Playlist} from "./pages/Playlist";
import {Login} from "./pages/auth/Login";
import AccountRestricted from "./pages/restricted/Account";
import AppLayout from "./components/app/AppLayout";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<AppLayout><p>test</p></AppLayout>} />
            <Route path="/playlist/:id" element={<AccountRestricted><AppLayout><Playlist /></AppLayout></AccountRestricted>} />

            <Route path="/login" element={<Layout><Login /></Layout>} />
        </Routes>
    )
}
