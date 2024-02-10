import {Route, Routes, useLocation} from "react-router-dom";
import AppLayout from "./components/view/Layout";
import Home from "./components/page/Home";

export default function App() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        </Routes>
    )
}
