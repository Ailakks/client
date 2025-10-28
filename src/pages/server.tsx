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
import { decodeMask } from "@/util/permission";

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
                            server.channels.filter((item: { type: number }) => item.type == 4).sort((a: { position: number }, b: { position: number }) => a.position - b.position).map((item: { name: string, permission_overwrites: [{ id: string, allow: string }] }, key: number) => {
                                return (
                                    <SidebarMenuItem key={key}>
                                        <SidebarMenuButton asChild>
                                            {(() => {
                                                const everyone = server.roles.find((item: { name: string }) => item.name == "@everyone");
                                                const permission = item.permission_overwrites.find((item) => item.id === everyone.id);

                                                if (permission && decodeMask(permission.allow).includes("VIEW_CHANNEL")) {
                                                    return (
                                                        <div>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    );
                                                }
                                            })()}
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
