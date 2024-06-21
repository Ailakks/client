import {createContext, useState} from 'react';

export const PlayerContext = createContext(null);

export default function TrackWrapper({ children }) {
    const [app, setApp] = useState();
    const [track, setTrack] = useState();

    return (
        <PlayerContext.Provider value={{ app, setApp, track, setTrack }}>
            {children}
        </PlayerContext.Provider>
    );
}
