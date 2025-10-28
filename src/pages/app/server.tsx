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
    SidebarProvider,
} from "@/components/ui/sidebar"
import { checkVisible } from "@/lib/roles";
import { Channel } from "./channel";
import type { Guild } from "@/transform/guild.transform";

export function Server() {
    const { server, channel } = useParams();
    const { data } = useContext(ProfileContext);

    const [serverData, setServerData] = useState<Guild>(null);

    useEffect(() => {
        setServerData(data.data.guilds.find((current) => current.id == server));
    }, [server]);

    if (!serverData) {
        return <p>test</p>
    }

    return (
        <SidebarProvider>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                serverData.channels.filter((item) => item.type == 4).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                    if (serverData.channels.filter((item) => item.type != 4).filter((target) => checkVisible(data, serverData, target, "VIEW_CHANNEL")).find((target) => target.parent_id == item.id)) {
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
                                                    serverData.channels.filter((item: { type: number }) => item.type != 4).filter((target) => target.parent_id == item.id).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                                        if (checkVisible(data, serverData, item, "VIEW_CHANNEL")) {
                                                            return (
                                                                <Fragment key={key}>
                                                                    <SidebarMenuItem>
                                                                        <SidebarMenuButton asChild>
                                                                            <a href={`/${server}/${item.id}`}>
                                                                                <p>{item.name}</p>
                                                                            </a>
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
            <main className="flex-1">
                {channel && <Channel serverData={serverData} />}
            </main>
        </SidebarProvider>
    );
}
