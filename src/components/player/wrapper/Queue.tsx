import {createContext, useState} from "react";

export const PlayerQueueContext = createContext(null);

export function PlayerQueueWrapper({ children }) {
    const [current, setCurrent] = useState();

    return (
        <PlayerQueueContext.Provider value={{ current, setCurrent }}>
            {children}
        </PlayerQueueContext.Provider>
    )
}
