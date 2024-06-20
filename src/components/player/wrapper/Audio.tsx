import {createContext, useState} from "react";

export const AudioContext = createContext(null);

export function AudioWrapper({ children }) {
    const [audio, setAudio] = useState();

    return (
        <AudioContext.Provider value={{ audio, setAudio }}>
            {children}
        </AudioContext.Provider>
    )
}
