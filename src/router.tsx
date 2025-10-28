import { Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { Home } from "./home";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
