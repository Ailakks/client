import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Server } from "./server";
import { Debug } from "./debug";

export function AppRouter() {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="/:id" element={<Server />} />
             <Route path="/debug" element={<Debug />} />
        </Routes>
    );
}
