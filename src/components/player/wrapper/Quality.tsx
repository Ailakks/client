import {createContext, useState} from "react";

export const PlayerQualityContext = createContext(null);

export function PlayerQualityWrapper({ children }) {
    const [quality, setQuality] = useState();

    return (
        <PlayerQualityContext.Provider value={{ quality, setQuality }}>
            {children}
        </PlayerQualityContext.Provider>
    )
}
