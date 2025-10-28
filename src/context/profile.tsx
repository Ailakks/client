import { createContext, useEffect, useState } from "react";
import { getCookie } from "../pages/cookies";

export const ProfileContext = createContext<{ data: any }>({ data: null });

export function ProfileWrapper({ children }: { children: any }) {
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
        <ProfileContext.Provider value={{ data }}>
            {children}
        </ProfileContext.Provider>
    );
}
