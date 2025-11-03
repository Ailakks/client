import { ChannelSubscribePayload } from "@/api/payload/channel-subscribe.payload";
import {
    SidebarProvider,
    Sidebar
} from "@/components/ui/sidebar"
import { WebSocketClient } from "@/lib/websocket";
import { plainToInstance } from "class-transformer";
import { useEffect } from "react";

interface a {
    a: string
}

export function MemberList() {
    useEffect(() => {
        WebSocketClient.send(JSON.stringify(plainToInstance<ChannelSubscribePayload, ChannelSubscribePayload>(ChannelSubscribePayload, { d: { guild: '', channel: '' }, op: 1 } , {})));
    }, []);

    return (
        <SidebarProvider className="h-full">
            <Sidebar side="right">
                <p>test</p>
            </Sidebar>
        </SidebarProvider>
    );
}
