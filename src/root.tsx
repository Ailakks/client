import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./home";
import "./index.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const elem = document.getElementById("root")!;
const app = (
    <StrictMode>
        <SidebarProvider>
            <main>
                <SidebarTrigger />
                <App />
            </main>
        </SidebarProvider>
    </StrictMode>
);

if (import.meta.hot) {
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
} else {
    createRoot(elem).render(app);
}
