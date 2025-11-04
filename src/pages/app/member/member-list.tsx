import type { ChannelSubscribePayload } from "@/api/payload/channel-subscribe.payload";
import { ChannelSubscribeTransform } from "@/api/transform/channel-subscribe.transform";
import { GuildMemberListUpdateTransform, Member } from "@/api/transform/discord/guild-member-list-update.transform";
import type { WebSocketEventType } from "@/api/type/websocket-event.type";
import {
    SidebarProvider,
    Sidebar,
    SidebarInset,
    SidebarContent
} from "@/components/ui/sidebar"
import { WebSocketClient } from "@/lib/websocket";
import { plainToInstance } from "class-transformer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MemberCard } from "./member-card";
import { Channel } from "../channel";
import type { GuildTransform } from "@/api/transform/guild.transform";

export function MemberList({ guildData }: { guildData: GuildTransform }) {
    const { guild, channel } = useParams();

    const [memberListData, setMemberListData] = useState<GuildMemberListUpdateTransform>(null);

    useEffect(() => {
        if (!guild || !channel) {
            return;
        }

        setMemberListData(null);

        WebSocketClient.send(JSON.stringify(plainToInstance<ChannelSubscribeTransform, ChannelSubscribePayload>(ChannelSubscribeTransform, { guild, channel }, { excludeExtraneousValues: true })));

        WebSocketClient.onmessage = event => {
            const data: WebSocketEventType = JSON.parse(event.data);
            if (data.t === "GUILD_MEMBER_LIST_UPDATE") {
                setMemberListData(previous => previous ?? plainToInstance(GuildMemberListUpdateTransform, data, { excludeExtraneousValues: true }));
            }
        };
    }, [channel]);

    return (
        <SidebarInset>
            <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background px-3 py-2">
                <p>header</p>
            </header>
            <div className="flex h-full overflow-hidden">
                <div className="flex-1">
                    {channel && <Channel guildData={guildData} />}
                </div>
                <SidebarProvider className="w-fit overflow-hidden max-h-dvh">
                    <Sidebar side="right" collapsible="none">
                        {memberListData ?
                            (<SidebarContent>
                                {memberListData.data.operations[0].items?.map((item, key) => {
                                    return (
                                        <div key={key}>
                                            {item.group && <p>{item.group.id}</p>}
                                            {item.member && <MemberCard member={item.member} />}
                                        </div>
                                    )
                                })}
                            </SidebarContent>) : <p>loading</p>}
                    </Sidebar>
                </SidebarProvider>
            </div>
        </SidebarInset>
    );
}
