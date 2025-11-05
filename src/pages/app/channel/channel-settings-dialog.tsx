import type { ChannelTransform } from "@/api/transform/channel.transform";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
                            <SidebarContent className="p-5">
                                <p>#{item.name}</p>
                                <TabsList className="flex flex-col space-y-2">
                                    <TabsTrigger value="general" asChild>
                                        <Button variant="outline">General</Button>
                                    </TabsTrigger>
                                    <TabsTrigger value="roles" asChild>
                                        <Button variant="outline">Roles</Button>
                                    </TabsTrigger>
                                </TabsList>
                            </SidebarContent>
                        </Sidebar>
                    </SidebarProvider>
                    <TabsContent value="general">
                        <p>general</p>
                    </TabsContent>
                    <TabsContent value="roles">
                        <p>roles</p>
                    </TabsContent>
                </div>
            </Tabs>
        </DialogContent>
    );
}
