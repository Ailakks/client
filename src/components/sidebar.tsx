import { useEffect, useState } from "react";
import { getCookie } from "../pages/cookies";
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

export function HomeSidebar() {
    const [data, setData] = useState<any>();

    useEffect(() => {
        const socket = new WebSocket(`wss://gateway.discord.gg/?encoding=json&v=9`);

        socket.onopen = () => socket.send(JSON.stringify({
            "op": 2,
            "d": {
                "token": getCookie('token'),
                "properties": {
                }
            }
        }));

        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            if (data.t === "READY") {
                setData(data);
            }
        };

    }, []);

    if (!data) {
        return <p>Cargando...</p>
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Servidores</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                data.d.guilds.map((item: { name: string }, key: number) => {
                                    return (
                                        <SidebarMenuItem key={key}>
                                            <SidebarMenuButton asChild>
                                                <div>
                                                    <Avatar>
                                                        <AvatarImage src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png?size=80&quality=lossless`} alt="@shadcn" />
                                                        <AvatarFallback>{item.name}</AvatarFallback>
                                                    </Avatar>
                                                    <p>{item.name}</p>
                                                </div>
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
