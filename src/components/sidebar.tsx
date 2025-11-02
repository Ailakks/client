import { useContext, useEffect, useState } from "react";
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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { ProfileContext } from "@/context/profile";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { ProfileTransform } from "@/transform/profile.transform";
import type { GuildTransform } from "@/transform/guild.transform";

export function HomeSidebar() {
    const { data } = useContext<{ data: ProfileTransform }>(ProfileContext);

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Servidores</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                data.data.guilds.map((item: GuildTransform, key: number) => {
                                    return (
                                        <SidebarMenuItem key={key}>
                                            <SidebarMenuButton>
                                                <a href={`/${item.id}`}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Avatar>
                                                                <AvatarImage src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png?size=80&quality=lossless`} alt={item.name} />
                                                                <AvatarFallback>{item.name}</AvatarFallback>
                                                            </Avatar>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="left">
                                                            <p>{item.name}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
