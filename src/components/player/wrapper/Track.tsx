import {createContext, useState} from "react";

export const PlayerTrackContext = createContext(null);

export function PlayerTrackWrapper({ children }) {
    const [track, setTrack] = useState();

    return (
        <PlayerTrackContext.Provider value={{ track, setTrack }}>
            {children}
        </PlayerTrackContext.Provider>
    )
}
