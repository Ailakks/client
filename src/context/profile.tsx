import { createContext, useEffect, useState } from "react";
import { getCookie } from "../lib/cookies";
import { plainToInstance } from "class-transformer";
import { Profile } from "@/transform/profile.transform";

export const ProfileContext = createContext<{ data: Profile }>({ data: null });

export function ProfileWrapper({ children }: { children: any }) {
    const [data, setData] = useState<Profile>();

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
                setData(plainToInstance(Profile, data));
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
