import { ProfileContext } from "@/context/profile";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { check } from "@/lib/roles";
import { Channel } from "./channel";
import type { GuildTransform } from "@/transform/guild.transform";
import { Permissions } from "@/lib/permissions";
import { Button } from "@/components/ui/button";

export function Guild() {
    const { guild, channel } = useParams();
    const { data } = useContext(ProfileContext);

    const [guildData, setGuildData] = useState<GuildTransform>(null);

    useEffect(() => {
        setGuildData(data.data.guilds.find((current) => current.id == guild));
    }, [guild]);

    if (!guildData) {
        return <p>test</p>
    }

    return (
        <SidebarProvider>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                guildData.channels.filter((item) => item.type == 4).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                    if (guildData.channels.filter((item) => item.type != 4).filter((target) => check(data, guildData, target, Permissions.ViewChannel)).find((target) => target.parent_id == item.id)) {
                                        return (
                                            <Fragment key={key}>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton asChild>
                                                        <div>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    </SidebarMenuButton>
                                                    {check(data, guildData, item, Permissions.ManageChannels) && <Button>new</Button>}
                                                </SidebarMenuItem>
                                                {
                                                    guildData.channels.filter((item: { type: number }) => item.type != 4).filter((target) => target.parent_id == item.id).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                                        if (check(data, guildData, item, Permissions.ViewChannel)) {
                                                            return (
                                                                <Fragment key={key}>
                                                                    <SidebarMenuItem>
                                                                        <SidebarMenuButton asChild>
                                                                            <a href={`/${guild}/${item.id}`}>
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
                {channel && <Channel guildData={guildData} />}
            </main>
        </SidebarProvider>
    );
}
