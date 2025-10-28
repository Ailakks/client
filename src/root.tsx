import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./pages/router";

const elem = document.getElementById("root")!;
const app = (
    <StrictMode>
        <Router />
    </StrictMode>
);

if (import.meta.hot) {
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
} else {
    createRoot(elem).render(app);
}
