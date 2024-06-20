import {createContext, useState} from "react";

export const Context = createContext(null);

export function PlayerContext({ children }) {
    const [current, setCurrent] = useState();

    return (
        <Context.Provider value={{ current, setCurrent }}>
            {children}
        </Context.Provider>
    )
}
