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
                           server.channels.map((item: any, key: number) => {
                                return (
                                    <SidebarMenuItem key={key}>
                                        <SidebarMenuButton asChild>
                                            {decodeMask(item.permission_overwrites[0].allow).includes("VIEW_CHANNEL") && <div>
                                                <p>{item.name}</p>
                                            </div>}
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
