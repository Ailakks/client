import type { ChannelSubscribePayload } from "@/api/payload/channel-subscribe.payload";
import { ChannelSubscribeTransform } from "@/api/transform/channel-subscribe.transform";
import { GuildMemberListUpdateTransform } from "@/api/transform/discord/guild-member-list-update.transform";
import type { GuildTransform } from "@/api/transform/guild.transform";
import type { ChannelSubscribeType } from "@/api/type/channel-subscribe.type";
import {
    SidebarProvider,
    Sidebar
} from "@/components/ui/sidebar"
import { me } from "@/lib/roles";
import { WebSocketClient } from "@/lib/websocket";
import { plainToInstance } from "class-transformer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function MemberList({ guildData }: { guildData: GuildTransform }) {
    const { guild, channel } = useParams();

    const [data, setData] = useState<GuildMemberListUpdateTransform>(null);

    useEffect(() => {
        WebSocketClient.send(JSON.stringify(plainToInstance<ChannelSubscribeTransform, ChannelSubscribePayload>(ChannelSubscribeTransform, { guild, channel }, { excludeExtraneousValues: true })));

        WebSocketClient.onmessage = event => {
            const data: ChannelSubscribeType = JSON.parse(event.data);
            if (data.t === "GUILD_MEMBER_LIST_UPDATE") {
                setData(plainToInstance(GuildMemberListUpdateTransform, data, { excludeExtraneousValues: true }));
            }
        };
    }, []);

    return (
        <SidebarProvider className="h-full">
            <Sidebar side="right">
                <p>test</p>
            </Sidebar>
        </SidebarProvider>
    );
}
