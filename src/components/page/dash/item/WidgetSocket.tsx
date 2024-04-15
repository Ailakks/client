import {createContext, useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";
import {WidgetDataContext} from "./Widget";

export const WidgetSocketContext = createContext(null);

export const MAX_EVENT_HISTORY = 60;

export default function WidgetProvider({ children }) {
    const { response: { channelList } } = useContext(ChannelContex);
    const { metadata: { scopes } } = useContext(WidgetDataContext);

    const [list, setList] = useState([]);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_SOCKET_URL);

        socket.on('connect', () =>  {
            channelList.forEach(({ platform, username }) => {
                socket.emit('join', JSON.stringify({ platform, target: username, scopes }))
            });
        });

        socket.on('message', (data) =>  {
            const { meta: { scope } } = data;

            if (!scopes.find(({ id }) => id === scope.id)) {
                return;
            }

            setList((previous) => [...previous.slice(-MAX_EVENT_HISTORY), data]);
        });

        return () => socket.off();
    }, []);

    return (
        <WidgetSocketContext.Provider value={{ list }}>
            {children}
        </WidgetSocketContext.Provider>
    )
}
