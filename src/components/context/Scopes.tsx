import {createContext} from "react";
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";

export const ScopesContext = createContext();

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

const massive = {
    [Category.VIEW]: {
        [Scope.DOWNLOAD]: {
            icon: 'fa-regular fa-arrow-down-to-bracket',
            name: 'Download'
        }
    },
    [Category.DELETE]: {
        [Scope.TRASH]: {
            icon: 'fa-regular fa-trash',
            name: 'Move to trash'
        },
    },
}

const files = {
    [Category.VIEW]: {
        [Scope.VIEW]: {
            icon: 'fa-regular fa-eye',
            name: 'View'
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

export default function Scopes({ scopes, children }) {
    const { isOpen, onOpen } = useDisclosure();

    return (
        <ScopesContext.Provider value={{ scopes, massive, files, folders }}>
            <Modal isOpen={isOpen}>
                <ModalContent>
                    <p>test</p>
                </ModalContent>
            </Modal>
            {children}
        </ScopesContext.Provider>
    )
}
