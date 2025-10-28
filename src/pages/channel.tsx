import { AxiosClient } from "@/lib/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Channel({ serverData: any }) {
    const { channel } = useParams();

    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const update = async () => {
            setData(await AxiosClient.get(`channels/${channel}/messages`, { params: { limit: 50 } }).then(({ data }) => data))
        };

        update();
    }, [channel]);

    return (
        <li>
            {
                data.map((item: any, key: number) => {
                    return (
                        <ol key={key}>
                            <p>{item.author.username}</p>
                            <p>{item.content}</p>
                        </ol>
                    )
                })}
        </li>
    );
}
