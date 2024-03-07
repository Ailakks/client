import {createContext, useContext} from "react";
import {PopupContext} from "../../wrapper/ui/PopupProvider";
import FilePopup from "../item/FilePopup";
import ItemContext from "../data/list/ItemContext";

export const ScopesContext = createContext();
export const ScopesDataContext = createContext();

export const Category = {
    VIEW: "view",
    USE: "use",
    ORGANIZE: "organize",
    SHARE: "share",
    MANAGE: "manage",
    DELETE: "delete",
}

export const Scope = {
    VIEW: "view",
    OPEN: "open",
    SHARE: "share",
    LINK: "link",
    DETAILS: "details",
    TAG: "tag",
    DOWNLOAD: "download",
    CLONE: "clone",
    RENAME: "rename",
    TRASH: "trash",
    DELETE: "delete",
}

export default function Scopes({ scopes, children }) {
    const { setPopup } = useContext(PopupContext);

    const files = {
        [Category.VIEW]: {
            [Scope.VIEW]: {
                icon: 'fa-regular fa-eye',
                name: 'View',
                action: (data) => {
                    setPopup(
                        <ScopesDataContext.Provider value={{ data }}>
                            <FilePopup />
                        </ScopesDataContext.Provider>
                    );
                }
            },
            [Scope.DOWNLOAD]: {
                icon: 'fa-regular fa-arrow-down-to-bracket',
                name: 'Download'
            },
            [Scope.LINK]: {
                icon: 'fa-regular fa-link',
                name: 'Link'
            }
        },
        [Category.MANAGE]: {
            [Scope.CLONE]: {
                icon: 'fa-regular fa-copy',
                name: 'Clone'
            },
            [Scope.RENAME]: {
                icon: 'fa-regular fa-pen',
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

    return (
        <ScopesContext.Provider value={{ scopes, files, folders }}>
            {children}
        </ScopesContext.Provider>
    )
}
