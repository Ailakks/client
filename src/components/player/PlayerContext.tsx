import {createContext, useState} from "react";

export const PlayerContext = createContext(null);

export function PlayerContext({ children }) {
    const [current, setCurrent] = useState();

    return (
        <PlayerContext.Provider value={{ current, setCurrent }}>
            {children}
        </PlayerContext.Provider>
    )
}
