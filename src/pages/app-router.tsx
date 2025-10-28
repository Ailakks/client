import { Route, Routes } from "react-router-dom";
import { Home } from "./app/home";
import { Server } from "./app/server";
import { Debug } from "./debug";

export function AppRouter() {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="/:server" element={<Server />} />
            <Route path="/:server/:channel" element={<Server />} />
            <Route path="/debug" element={<Debug />} />
        </Routes>
    );
}
