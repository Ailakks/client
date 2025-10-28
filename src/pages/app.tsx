import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { HomeSidebar } from "../components/sidebar";
import { ProfileWrapper } from "@/context/profile";
import { AppRouter } from "./app-router";

export function App() {
    return (
        <ProfileWrapper>
            <SidebarProvider>
                <HomeSidebar />
                <main>
                    <SidebarTrigger />
                    <AppRouter />
                </main>
            </SidebarProvider>
        </ProfileWrapper>
    );
}
