import type { ChannelTransform } from "@/api/transform/channel.transform";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";

export function ChannelSettingsDialog({ item }: { item: ChannelTransform }) {
    return (
        <DialogContent className="fixed inset-0 m-0 h-full w-full rounded-none p-0">
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <p>#{item.name}</p>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
            <DialogHeader>
                <DialogTitle>Vista general</DialogTitle>
            </DialogHeader>
        </DialogContent>
    );
}