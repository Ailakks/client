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
import { checkVisible } from "@/lib/roles";
import { Channel } from "./channel";
import type { GuildTransform } from "@/transform/guild.transform";

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
                                    if (guildData.channels.filter((item) => item.type != 4).filter((target) => checkVisible(data, guildData, target, "VIEW_CHANNEL")).find((target) => target.parent_id == item.id)) {
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
                                                    guildData.channels.filter((item: { type: number }) => item.type != 4).filter((target) => target.parent_id == item.id).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                                        if (checkVisible(data, guildData, item, "VIEW_CHANNEL")) {
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
