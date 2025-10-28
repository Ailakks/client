import { useEffect, useState } from "react";
import { getCookie } from "./cookies";
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

export function App() {
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
                                            <SidebarMenuButton asChild>{item.name}</SidebarMenuButton>
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
