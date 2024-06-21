import Layout from "./components/layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<Layout><p>test</p></Layout>} />
        </Routes>
    )
}
