import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MessagePinsTransform, MessageTransform } from "@/api/transform/message.transform";
import { useEffect, useState } from "react";
import type { ChannelTransform } from "@/api/transform/channel.transform";
import { useParams } from "react-router-dom";
import { AxiosClient } from "@/lib/axios";
import { Message } from "./message";

export function MessagePins({ channelData }: { channelData?: ChannelTransform }) {
    const { channel } = useParams();

    const [data, setData] = useState<MessagePinsTransform>(null);

    useEffect(() => {
        AxiosClient.get(`channels/${channel}/messages/pins`, { params: { limit: 25 } }).then(({ data }) => setData(data));
    }, [channel]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mensajes fijados</CardTitle>
            </CardHeader>
            <CardContent>
                {data ? data.items.map((item) => item.message).map((item, key) => {
                    return (
                        <Message key={key} message={item} />
                    )
                }) : <p>empty</p>}
            </CardContent>
        </Card>
    );
}
