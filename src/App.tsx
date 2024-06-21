import Layout from "./components/layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";
import Playlist from "./pages/Playlist";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<Layout><p>test</p></Layout>} />
            <Route path="/playlist/:id" element={<Layout><Playlist /></Layout>} />
        </Routes>
    )
}
