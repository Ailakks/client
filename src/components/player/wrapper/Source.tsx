import {createContext, useState} from "react";

export const PlayerSourceContext = createContext(null);

export function PlayerSourceWrapper({ children }) {
    const [source, setSource] = useState();

    return (
        <PlayerSourceContext.Provider value={{ source, setSource }}>
            {children}
        </PlayerSourceContext.Provider>
    )
}
