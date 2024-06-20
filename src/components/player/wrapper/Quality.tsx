import {createContext, useState} from "react";

export const QualityContext = createContext(null);

export function QualityWrapper({ children }) {
    const [quality, setQuality] = useState();

    return (
        <QualityContext.Provider value={{ quality, setQuality }}>
            {children}
        </QualityContext.Provider>
    )
}
