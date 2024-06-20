import {createContext} from "react";

export const AudioContext = createContext(null);

export function AudioWrapper({ children }) {
    return children;
}
