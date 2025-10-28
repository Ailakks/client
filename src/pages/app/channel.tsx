import { Card, CardContent } from "@/components/ui/card";
import { AxiosClient } from "@/lib/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'
import type { GuildTransform } from "@/transform/guild.transform";

export function Channel({ guildData }: { guildData: GuildTransform }) {
    const { channel } = useParams();

    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const update = async () => {
            setData(await AxiosClient.get(`channels/${channel}/messages`, { params: { limit: 50 } }).then(({ data }) => data))
        };

        update();
    }, [channel]);

    return (
        <ol>
            {
                data.map((item, key: number) => {
                    return (
                        <li key={key}>
                            <div className="space-y-2">
                                <div className="flex space-x-2">
                                    <Avatar className="h-12 aspect-square bg-red-500 rounded-full overflow-hidden">
                                        {item.author.avatar && <AvatarImage src={`https://cdn.discordapp.com/avatars/${item.author.id}/${item.author.avatar}.webp?size=128`} alt={item.author.username} />}
                                        <AvatarFallback>{item.author.username}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="h-6 flex text-nowrap space-x-2">
                                            <p>{item.author.username}</p>
                                            <p>{item.timestamp}</p>
                                            {item.edited_timestamp && <p>(editado)</p>}
                                        </div>
                                        {
                                            item.attachments.map((item, key: number) => {
                                                return (
                                                    <img className="rounded-lg" src={item.proxy_url} />
                                                )
                                            })
                                        }
                                        {
                                            item.embeds.map((item, key: number) => {
                                                return (
                                                    <Card>
                                                        <CardContent>
                                                            <Markdown>{item.description}</Markdown>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            })
                                        }
                                        <p className="h-6">{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
        </ol>
    );
}
