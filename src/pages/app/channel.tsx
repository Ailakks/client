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
        <div className="h-full overflow-hidden">
            <div className="h-full overflow-scroll">
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
            </div>
            <footer className="sticky bottom-0 flex shrink-0 items-center gap-2 border-t bg-background px-3 py-2">
                <p>footer</p>
            </footer>
        </div>
    );
}
