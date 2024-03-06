import {createContext} from "react";

export const ScopesContext = createContext();

export const Scope = {
    VIEW: "view",
    OPEN: "open",
    DETAILS: "details",
    RENAME: "rename",
    DOWNLOAD: "download",
    EXPORT: "export",
    TRASH: "trash",
    DELETE: "delete",
}

const files = {
    [Scope.VIEW]: {
        icon: 'fa-regular fa-eye',
        name: 'View'
    },
    [Scope.OPEN]: {
        icon: 'fa-regular fa-eye',
        name: 'Open'
    }
}

const folders = {
    [Scope.OPEN]: {
        icon: 'fa-regular fa-eye',
        name: 'Open'
    }
}

export default function Scopes({ scopes, children }) {
    return (
        <ScopesContext.Provider value={{ scopes, files, folders }}>
            {children}
        </ScopesContext.Provider>
    )
}
