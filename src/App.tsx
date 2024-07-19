import Layout from "./components/layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";
import {Playlist} from "./pages/Playlist";
import {Login} from "./pages/auth/Login";
import AccountRestricted from "./pages/restricted/Account";
import AppLayout from "./components/app/AppLayout";
import {Search} from "./pages/Search";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<AccountRestricted><AppLayout><p>test</p></AppLayout></AccountRestricted>} />
            <Route path="/search" element={<AccountRestricted><AppLayout><Search /></AppLayout></AccountRestricted>} />
            <Route path="/playlist/:id" element={<AccountRestricted><AppLayout><Playlist /></AppLayout></AccountRestricted>} />

            <Route path="/login" element={<Layout><Login /></Layout>} />
        </Routes>
    )
}
