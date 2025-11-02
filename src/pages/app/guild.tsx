import { ProfileContext } from "@/context/profile";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    SidebarContent,
    SidebarGroup,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarMenu
} from "@/components/ui/sidebar"
import { check } from "@/lib/roles";
import { Channel } from "./channel";
import type { GuildTransform } from "@/transform/guild.transform";
import { Permissions } from "@/lib/permissions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

    const types = {
        0: {
            name: 'chat channel',
            icon: "fa-solid fa-hashtag"
        },
        2: {
            name: 'voice channel',
            icon: "fa-solid fa-volume"
        },
        5: {
            name: 'announcements',
            icon: "fa-solid fa-megaphone"
        },
        13: {
            name: 'stages',
            icon: "fa-solid fa-podcast"
        },
        15: {
            name: 'forum',
            icon: "fa-solid fa-comments"
        }
    }

    return (
        <div className="w-(--sidebar-width) bg-sidebar text-sidebar-foreground h-full flex-col">
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
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button>
                                                            <i className="fa-solid fa-plus" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>New</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </SidebarGroupAction>
                                        )}
                                        {
                                            guildData.channels.filter((item: { type: number }) => item.type != 4).filter((target) => target.parent_id == item.id).sort((a, b) => a.position - b.position).map((item, key: number) => {
                                                if (check(data, guildData, item, Permissions.ViewChannel)) {
                                                    return (
                                                        <SidebarMenuItem key={key}>
                                                            <SidebarMenuButton className="flex">
                                                                <i className={types[item.type]?.icon} />
                                                                <p className="flex-1">{item.name}</p>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button>
                                                                            <i className="fa-solid fa-user-plus" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Invite</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button>
                                                                            <i className="fa-solid fa-gear" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Edit</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </SidebarMenuButton>
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
            <main className="flex-1">
                {channel && <Channel guildData={guildData} />}
            </main>
        </div>
    );
}
