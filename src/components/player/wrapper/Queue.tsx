import {createContext, useState} from "react";

export const PlayerQueueContext = createContext(null);

export function PlayerQueueWrapper({ children }) {
    const [queue, setQueue] = useState();

    return (
        <PlayerQueueContext.Provider value={{ queue, setQueue }}>
            {children}
        </PlayerQueueContext.Provider>
    )
}
