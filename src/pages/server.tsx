import { ProfileContext } from "@/context/profile";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function Server() {
    const { id } = useParams();
    const { data } = useContext(ProfileContext);

    const [server, setServer] = useState<any>(null);

    useEffect(() => {
        setServer(data.d.guilds.find((current: { id: string }) => current.id == id));
    }, [data]);

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Servidores</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                           server.channels.map((item: { name: string }, key: number) => {
                                return (
                                    <SidebarMenuItem key={key}>
                                        <SidebarMenuButton asChild>
                                            <p>{item.name}</p>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
