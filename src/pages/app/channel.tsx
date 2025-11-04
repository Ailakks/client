import { AxiosClient } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { GuildTransform } from "@/api/transform/guild.transform";
import type { MessageTransform } from "@/api/transform/message.transform";
import { Message } from "./message/message";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col h-full overflow-hidden">
            <div className="h-full overflow-auto">
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
            <footer className="border-t p-2">
                <InputGroup>
                    <InputGroupTextarea placeholder="Send message to" />
                    <InputGroupAddon align="inline-start">
                        <InputGroupButton variant="default" size="icon-xs">
                            <i className="fa-solid fa-plus" />
                        </InputGroupButton>
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="default" size="icon-xs">
                            <i className="fa-solid fa-gif" />
                        </InputGroupButton>
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="default" size="icon-xs">
                            <i className="fa-solid fa-note-sticky" />
                        </InputGroupButton>
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="default" size="icon-xs">
                            <i className="fa-solid fa-smile" />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </footer>
        </div>
    );
}
