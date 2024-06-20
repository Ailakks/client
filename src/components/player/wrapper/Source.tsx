import {createContext, useState} from "react";

export const SourceContext = createContext(null);

export function SourceWrapper({ children }) {
    const [source, setSource] = useState();

    return (
        <SourceContext.Provider value={{ source, setSource }}>
            {children}
        </SourceContext.Provider>
    )
}
