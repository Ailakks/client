import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getCookie } from "./cookies";

export function App() {
    const [data, setData] = useState<any>();

    useEffect(() => {
        const socket = io("wss://gateway.discord.gg/?encoding=json&v=9");

        socket.on("connect", () => {
            socket.send({
                "op": 2,
                "d": {
                    "token": getCookie('token'),
                    "properties": {
                    }
                }
            })
        })

        socket.on("message", (data: { t: string }) => {
            if (data.t == "READY") {
                setData(data);
            }
        });
    }, []);

    return (
        <p>{JSON.stringify(data)}</p>
    );
}
