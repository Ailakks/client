import { AxiosClient } from "@/lib/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
                        <li key={key} className="flex space-x-5 items-center">
                            <Avatar>
                                <AvatarImage className="w-10! rounded-full" src={`https://cdn.discordapp.com/avatars/${item.author.id}/${item.author.avatar}.webp?size=128`} alt={item.author.username} />
                                <AvatarFallback>{item.username}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p>{item.author.username}</p>
                                <p>{item.content}</p>
                            </div>
                        </li>
                    )
                })}
        </ol>
    );
}
