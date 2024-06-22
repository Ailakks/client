import Layout from "./components/layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";
import {Playlist} from "./pages/Playlist";
import {Login} from "./pages/auth/Login";
import AccountRestricted from "./pages/restricted/Account";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<Layout><p>test</p></Layout>} />
            <Route path="/playlist/:id" element={<Layout><AccountRestricted><Playlist /></AccountRestricted></Layout>} />

            <Route path="/login" element={<Layout><Login /></Layout>} />
        </Routes>
    )
}
