import { ProfileContext } from "@/context/profile";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    SidebarContent,
    SidebarGroup,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarMenu,
    SidebarProvider,
    Sidebar
} from "@/components/ui/sidebar"
import { check } from "@/lib/roles";
import { Channel } from "./channel";
import type { GuildTransform } from "@/transform/guild.transform";
import { Permissions } from "@/lib/permissions";
import { InviteUserButton } from "./channel/invite-user-button";
import { ChannelSettingsButton } from "./channel/channel-settings-button";
import { CreateChannelButton } from "./channel/create-channel-button";
import { ChannelTypes } from "@/data/channel-types";

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
        <div>
            <SidebarProvider className="w-fit h-full">
                <Sidebar collapsible="none">
                    <SidebarContent>
                        {
                            guildData.channels.filter((item) => item.type == 4).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                if (guildData.channels.filter((item) => item.type != 4).filter((target) => check(data, guildData, target, Permissions.ViewChannel)).find((target) => target.parent_id == item.id)) {
                                    return (
                                        <SidebarGroup key={key}>
                                            <SidebarMenu>
                                                <SidebarGroupLabel>{item.name}</SidebarGroupLabel>
                                                {check(data, guildData, item, Permissions.ManageChannels) && (
                                                    <SidebarGroupAction>
                                                        <CreateChannelButton data={data} guildData={guildData} item={item} />
                                                    </SidebarGroupAction>
                                                )}
                                                {
                                                    guildData.channels.filter((item: { type: number }) => item.type != 4).filter((target) => target.parent_id == item.id).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                                        if (check(data, guildData, item, Permissions.ViewChannel)) {
                                                            return (
                                                                <SidebarMenuItem key={key}>
                                                                    <a href={`/${guildData.id}/${item.id}`}>
                                                                        <SidebarMenuButton className="flex group">
                                                                            <i className={ChannelTypes[item.type]?.icon} />
                                                                            <p className="flex-1">{item.name}</p>
                                                                            <div className="space-x-2 hidden group-hover:block">
                                                                                <InviteUserButton data={data} guildData={guildData} item={item} />
                                                                                <ChannelSettingsButton data={data} guildData={guildData} item={item} />
                                                                            </div>
                                                                        </SidebarMenuButton>
                                                                    </a>
                                                                </SidebarMenuItem>
                                                            )
                                                        }
                                                    })
                                                }
                                            </SidebarMenu>
                                        </SidebarGroup>
                                    )
                                }
                            })
                        }
                    </SidebarContent>
                </Sidebar>
                <main>
                    {channel && <Channel guildData={guildData} />}
                </main>
            </SidebarProvider>
            <SidebarProvider className="h-full">
                <Sidebar side="right">
                    <p>test</p>
                </Sidebar>
            </SidebarProvider>
        </div>
    );
}
