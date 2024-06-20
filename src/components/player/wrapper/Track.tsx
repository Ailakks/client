import {createContext, useState} from "react";

export const PlayerTrackContext = createContext(null);

export function PlayerTrackWrapper({ children }) {
    const [current, setCurrent] = useState();

    return (
        <PlayerTrackContext.Provider value={{ current, setCurrent }}>
            {children}
        </PlayerTrackContext.Provider>
    )
}
