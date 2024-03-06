import {createContext} from "react";

export const ScopesContext = createContext();

export const Category = {
    VIEW: "view",
    USE: "use",
    SHARE: "share",
    MANAGE: "manage",
    DELETE: "delete"
}

export const Scope = {
    VIEW: "view",
    OPEN: "open",
    SHARE: "share",
    LINK: "link",
    DETAILS: "details",
    DOWNLOAD: "download",
    CLONE: "clone",
    RENAME: "rename",
    TRASH: "trash",
    DELETE: "delete",
}

const files = {
    [Category.VIEW]: {
        [Scope.VIEW]: {
            icon: 'fa-regular fa-eye',
            name: 'View'
        },
        [Scope.OPEN]: {
            icon: 'fa-regular fa-download',
            name: 'Download'
        },
    },
    [Category.SHARE]: {
        [Scope.LINK]: {
            icon: 'fa-regular fa-link',
            name: 'Link'
        }
    },
    [Category.MANAGE]: {
        [Scope.CLONE]: {
            icon: 'fa-regular fa-pencil',
            name: 'Clone'
        },
        [Scope.RENAME]: {
            icon: 'fa-regular fa-pencil',
            name: 'Rename'
        }
    },
    [Category.DELETE]: {
        [Scope.TRASH]: {
            icon: 'fa-regular fa-trash',
            name: 'Move to trash'
        },
    },
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
