import type { ChannelTransform } from "@/api/transform/channel.transform";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";

export function ChannelSettingsDialog({ item }: { item: ChannelTransform }) {
    return (
        <DialogContent className="inset-0 rounded-none sm:max-w-none top-0 left-0 translate-x-0 translate-y-0">
            <DialogHeader>
                <DialogTitle>Vista general</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="general">
                <div className="flex">
                    <SidebarProvider className="w-fit">
                        <Sidebar>
                            <SidebarContent>
                                <p>#{item.name}</p>
                                <TabsList>
                                    <TabsTrigger value="general">general</TabsTrigger>
                                    <TabsTrigger value="roles">roles</TabsTrigger>
                                </TabsList>
                            </SidebarContent>
                        </Sidebar>
                    </SidebarProvider>
                    <div>
                        <TabsList>
                            <TabsTrigger value="general">general</TabsTrigger>
                            <TabsTrigger value="roles">roles</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general">
                            <p>general</p>
                        </TabsContent>
                        <TabsContent value="roles">
                            <p>roles</p>
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </DialogContent>
    );
}