import { ProfileContext } from "@/context/profile";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { checkPermission } from "@/lib/roles";

export function Server() {
    const { id } = useParams();
    const { data } = useContext(ProfileContext);

    const [server, setServer] = useState<any>(null);

    useEffect(() => {
        console.log(data)
        setServer(data.d.guilds.find((current: { id: string }) => current.id == id));
    }, [data]);

    if (!server) {
        return <p>test</p>
    }

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Servidores</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                            server.channels.sort((a: { position: number }, b: { position: number }) => a.position - b.position).map((item: { name: string, permission_overwrites: [{ id: string, allow: string }] }, key: number) => {
                                if (checkPermission(server, item, "VIEW_CHANNEL")) {
                                    return (
                                        <SidebarMenuItem key={key}>
                                            <SidebarMenuButton asChild>
                                                <div>
                                                    <p>{item.name}</p>
                                                </div>
                                            </SidebarMenuButton>

                                        </SidebarMenuItem>
                                    )
                                }
                            })
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
