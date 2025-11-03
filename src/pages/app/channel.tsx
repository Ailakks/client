import { AxiosClient } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { GuildTransform } from "@/api/transform/guild.transform";
import type { MessageTransform } from "@/api/transform/message.transform";
import { Message } from "./message/message";

export function Channel({ guildData }: { guildData: GuildTransform }) {
    const { channel } = useParams();

    const [data, setData] = useState<MessageTransform[]>([]);

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
                            <Message message={item} />
                        </li>
                    )
                })}
        </ol>
    );
}
