import { useEffect, useState } from "react";
import { io } from "socket.io-client";
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

    return (
        <p>{JSON.stringify(data)}</p>
    );
}
