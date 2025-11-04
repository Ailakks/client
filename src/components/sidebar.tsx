import { useContext } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { ProfileContext } from "@/context/profile";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { ProfileTransform } from "@/api/transform/profile.transform";
import type { GuildTransform } from "@/api/transform/guild.transform";
import { Button } from "./ui/button";

export function HomeSidebar() {
    const { data } = useContext<{ data: ProfileTransform }>(ProfileContext);

    return (
        <SidebarProvider className="w-fit h-full">
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
                <SidebarFooter>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={`https://cdn.discordapp.com/avatars/${data.data.user.id}/${data.data.user.avatar}.webp?size=28`} alt={data.data.user.username} />
                            <AvatarFallback>{data.data.user.username}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p>{data.data.user.username}</p>
                            <p>{data.data.user.bio}</p>
                        </div>
                        <Button variant="outline">
                            <i className="fa-solid fa-gear" />
                        </Button>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    );
}
