import { Route, Routes } from "react-router-dom";
import { Home } from "./app/home";
import { Guild } from "./app/guild";
import { Debug } from "./debug";

export function AppRouter() {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="/:guild" element={<Guild />} />
            <Route path="/:guild/:channel" element={<Guild />} />
            <Route path="/debug" element={<Debug />} />
        </Routes>
    );
}
