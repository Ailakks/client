import { Card, CardContent } from "@/components/ui/card";
import { AxiosClient } from "@/lib/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown'

export function Channel({ serverData }: { serverData: any }) {
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
                data.map((item: any, key: number) => {
                    return (
                        <li key={key} className="">
                            <div className="flex-1 space-y-2">
                                <div className="flex space-x-2 items-center">
                                    <Avatar>
                                        <AvatarImage className="w-10! rounded-full" src={`https://cdn.discordapp.com/avatars/${item.author.id}/${item.author.avatar}.webp?size=128`} alt={item.author.username} />
                                        <AvatarFallback>{item.username}</AvatarFallback>
                                    </Avatar>
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
                                <p>{item.content}</p>
                            </div>
                        </li>
                    )
                })}
        </ol>
    );
}
