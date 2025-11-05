import type { ChannelTransform } from "@/api/transform/channel.transform";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Fragment } from "react/jsx-runtime";

export function ChannelSettingsDialog({ item }: { item: ChannelTransform }) {
    return (
        <Fragment>
            <DialogHeader>
                <DialogTitle>Vista general</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="general2">
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
        </Fragment>
    );
}