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
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { checkVisible } from "@/lib/roles";
import { Channel } from "./channel";

export function Server() {
    const { server } = useParams();
    const { data } = useContext(ProfileContext);

    const [serverData, setServerData] = useState<any>(null);

    useEffect(() => {
        setServerData(data.d.guilds.find((current: { id: string }) => current.id == server));
    }, [server]);

    if (!serverData) {
        return <p>test</p>
    }

    return (
        <SidebarProvider>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Servidores</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                serverData.channels.filter((item: { type: number }) => item.type == 4).sort((a: { position: number }, b: { position: number }) => a.position - b.position).map((item: any, key: number) => {
                                    if (serverData.channels.filter((item: { type: number }) => item.type != 4).filter((target: any) => checkVisible(data, serverData, target, "VIEW_CHANNEL")).find((target: { parent_id: string }) => target.parent_id == item.id)) {
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
                                                    serverData.channels.filter((item: { type: number }) => item.type != 4).filter((target: { parent_id: string }) => target.parent_id == item.id).sort((a: { position: number }, b: { position: number }) => a.position - b.position).map((item: any, key: number) => {
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
                <Channel serverData={serverData} />
            </main>
        </SidebarProvider>
    );
}
