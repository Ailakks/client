import { SidebarProvider } from "@/components/ui/sidebar"
import { HomeSidebar } from "../components/sidebar";
import { ProfileWrapper } from "@/context/profile";
import { AppRouter } from "./app-router";

export function App() {
    return (
        <ProfileWrapper>
            <div className="flex h-full overflow-hidden">
                <HomeSidebar />
                <AppRouter />
            </div>
        </ProfileWrapper>
    );
}
