import { ProfileContext } from "@/context/profile";
import { Fragment, useContext, useEffect, useState } from "react";
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
import { checkVisible, meRoles } from "@/lib/roles";

export function Server() {
    const { id } = useParams();
    const { data } = useContext(ProfileContext);

    const [server, setServer] = useState<any>(null);

    useEffect(() => {
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
                            server.channels.filter((item: { type: number }) => item.type == 4).sort((a: { position: number }, b: { position: number }) => a.position - b.position).map((item: any, key: number) => {
                                if (true) {
                                    return (
                                        <Fragment key={key}>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <div>
                                                        <p>{item.name}</p>
                                                    </div>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            {
                                                server.channels.filter((item: { type: number }) => item.type != 4).filter((target: { parent_id: string }) => target.parent_id == item.id).sort((a: { position: number }, b: { position: number }) => a.position - b.position).map((item: any, key: number) => {
                                                    if (checkVisible(data, server, item, "VIEW_CHANNEL")) {
                                                        return (
                                                            <Fragment key={key}>
                                                                <SidebarMenuItem>
                                                                    <SidebarMenuButton asChild>
                                                                        <div>
                                                                            <p>{item.name}</p>
                                                                        </div>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            </Fragment>
                                                        )
                                                    }
                                                })
                                            }
                                        </Fragment>
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
