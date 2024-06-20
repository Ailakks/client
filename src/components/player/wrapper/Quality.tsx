import {createContext, useState} from "react";

export const PlayerQualityContext = createContext(null);

export function PlayerQualityWrapper({ children }) {
    const [current, setCurrent] = useState();

    return (
        <PlayerQualityContext.Provider value={{ current, setCurrent }}>
            {children}
        </PlayerQualityContext.Provider>
    )
}
