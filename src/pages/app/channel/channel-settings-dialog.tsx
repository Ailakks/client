import type { ChannelTransform } from "@/api/transform/channel.transform";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";

export function ChannelSettingsDialog({ item }: { item: ChannelTransform }) {
    return (
        <DialogContent className="inset-0 rounded-none sm:max-w-none top-0 left-0 translate-x-0 translate-y-0">
            <DialogHeader>
                <DialogTitle>Vista general</DialogTitle>
            </DialogHeader>
        </DialogContent>
    );
}