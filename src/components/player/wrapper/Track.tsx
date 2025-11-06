import {createContext, useState} from "react";

export const TrackContext = createContext(null);

export function TrackWrapper({ children }) {
    const [track, setTrack] = useState();

    return (
        <TrackContext.Provider value={{ track, setTrack }}>
            {children}
        </TrackContext.Provider>
    )
}
