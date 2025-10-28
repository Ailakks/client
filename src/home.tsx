import { useEffect, useState } from "react";
import { getCookie } from "./cookies";

export function App() {
    const [data, setData] = useState<any>();

    useEffect(() => {
        const socket = new WebSocket(`wss://gateway.discord.gg/?encoding=json&v=9`);

        socket.onopen = () => socket.send(JSON.stringify({
            "op": 2,
            "d": {
                "token": getCookie('token'),
                "properties": {
                }
            }
        }));

        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            if (data.t === "READY") {
                setData(data);
            }
        };

    }, []);

    if (!data) {
        return <p>Cargando...</p>
    }

    return (
        <li>
            {data.d.guilds.map((item: { name: string }, key: number) => {
                return (
                    <div key={key}>
                        <p>{item.name}</p>
                    </div>
                )
            })}
        </li>
    );
}
