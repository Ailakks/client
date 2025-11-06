import {createContext, useState} from "react";

export const QueueContext = createContext(null);

export function QueueWrapper({ children }) {
    const [queue, setQueue] = useState([]);

    return (
        <QueueContext.Provider value={{ queue, setQueue }}>
            {children}
        </QueueContext.Provider>
    )
}
