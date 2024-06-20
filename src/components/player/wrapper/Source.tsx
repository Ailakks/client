import {createContext, useState} from "react";

export const PlayerSourceContext = createContext(null);

export function PlayerSourceWrapper({ children }) {
    const [current, setCurrent] = useState();

    return (
        <PlayerSourceContext.Provider value={{ current, setCurrent }}>
            {children}
        </PlayerSourceContext.Provider>
    )
}
