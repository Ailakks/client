import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export function App() {
    return (
        <SidebarProvider>
            <p>sidebar</p>
            <main>
                <SidebarTrigger />
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </main>
        </SidebarProvider>
    );
}
