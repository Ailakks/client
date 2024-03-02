import {createContext} from "react";

export const ScopesContext = createContext();

const Scopes = {
    VIEW: "view",
    DETAILS: "details",
    RENAME: "rename",
    DOWNLOAD: "download",
    EXPORT: "export",
    TRASH: "trash",
    DELETE: "delete",
}

export default function Scopes({ children }) {
    return (
        <ScopesContext.Provider value={{}}>
            {children}
        </ScopesContext.Provider>
    )
}
