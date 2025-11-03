import type { ChannelSubscribePayload } from "@/api/payload/channel-subscribe.payload";
import { ChannelSubscribeTransform } from "@/api/transform/channel-subscribe.transform";
import { Group, GuildMemberListUpdateTransform, Member } from "@/api/transform/discord/guild-member-list-update.transform";
import type { WebSocketEventType } from "@/api/type/websocket-event.type";
import {
    SidebarProvider,
    Sidebar
} from "@/components/ui/sidebar"
import { WebSocketClient } from "@/lib/websocket";
import { plainToInstance } from "class-transformer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MemberCard } from "./member-card";

export function MemberList() {
    const { guild, channel } = useParams();

    const [data, setData] = useState<GuildMemberListUpdateTransform>(null);

    useEffect(() => {
        WebSocketClient.send(JSON.stringify(plainToInstance<ChannelSubscribeTransform, ChannelSubscribePayload>(ChannelSubscribeTransform, { guild, channel }, { excludeExtraneousValues: true })));

        WebSocketClient.onmessage = event => {
            const data: WebSocketEventType = JSON.parse(event.data);
            if (data.t === "GUILD_MEMBER_LIST_UPDATE") {
                setData(plainToInstance(GuildMemberListUpdateTransform, data, { excludeExtraneousValues: true }));
            }
        };
    }, []);

    if (!data) {
        return;
    }

    return (
        <SidebarProvider className="h-full">
            <p>b</p>
            <Sidebar side="right">
                {data.data.operations[0].items.map((item, key) => {
                    return (
                        <div key={key}>
                            {item.group && <p>{item.group.id}</p>}
                            {item.member && <MemberCard member={item.member} />}
                        </div>
                    )
                })}
            </Sidebar>
        </SidebarProvider>
    );
}
