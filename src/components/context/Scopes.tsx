import {createContext, useContext} from "react";
import {PopupContext} from "../../wrapper/ui/Popup";
import FilePopup from "../item/FilePopup";
import {DownloadContext} from "../../wrapper/tool/Download";
import {AxiosContext} from "../../wrapper/Axios";
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import {FolderContext} from "../data/list/NewButton";
import {QueryContext} from "../query/Query";

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
    const { setCurrent } = useContext(PopupContext);

    const { client } = useContext(AxiosContext);
    const { download } = useContext(DownloadContext);

    const { refetch } = useContext(QueryContext);

    const navigate = useNavigate();

    const [trash] = useMutation(gql`
                mutation Trash($list: [String!]!) {
                    trash(payload: {
                        list: $list
                    }) {
                        done
                        __typename
                    }
                }`,
        {
            onCompleted: () => {
                refetch();
            }
        }
    );

    const files = {
        [Category.VIEW]: {
            [Scope.VIEW]: {
                id: 'view',
                name: 'View',
                icon: 'fa-regular fa-eye',
                action: (scopes, item) => {
                    setCurrent(
                        <ScopesDataContext.Provider value={{ scopes, item }}>
                            <FilePopup />
                        </ScopesDataContext.Provider>
                    );
                }
            },
            [Scope.DOWNLOAD]: {
                id: 'download',
                name: 'Download',
                icon: 'fa-regular fa-arrow-down-to-bracket',
                action: async (scopes, item) => {
                    const { id, source: { meta: { name, mime } } } = item;

                    const { data } = await client.get(`file/${id}`, { responseType: 'arraybuffer' });
                    const blob = new Blob([data], { type: mime });

                    download(name, blob);
                }
            },
            [Scope.LINK]: {
                id: 'link',
                name: 'Link',
                icon: 'fa-regular fa-link',
                action: (scopes, item) => {

                }
            }
        },
        [Category.MANAGE]: {
            [Scope.CLONE]: {
                id: 'clone',
                name: 'Clone',
                icon: 'fa-regular fa-copy',
                action: (scopes, item) => {

                }
            },
            [Scope.RENAME]: {
                id: 'rename',
                name: 'Rename',
                icon: 'fa-regular fa-pen',
                action: (scopes, item) => {

                }
            }
        },
        [Category.DELETE]: {
            [Scope.TRASH]: {
                id: 'trash',
                name: 'Move to trash',
                icon: 'fa-regular fa-trash',
                action: (scopes, item) => {
                    const { id } = item;

                    trash({ variables: { list: [id] } });
                }
            },
        },
    }

    const folders = {
        [Category.VIEW]: {
            [Scope.VIEW]: {
                id: 'open',
                name: 'Open',
                icon: 'fa-regular fa-eye',
                action: (scopes, item) => {
                    const { id } = item;

                    navigate(`/folder/${id}`);
                }
            }
        },
        [Category.DELETE]: {
            [Scope.TRASH]: {
                id: 'trash',
                name: 'Move to trash',
                icon: 'fa-regular fa-trash',
                action: (scopes, item) => {
                    const { id } = item;

                    trash({ variables: { list: [id] } });
                }
            },
        },
    }

    const massive = {
        [Category.VIEW]: {
            [Scope.DOWNLOAD]: {
                id: 'download',
                name: 'Download',
                icon: 'fa-regular fa-arrow-down-to-bracket',
            }
        },
        [Category.DELETE]: {
            [Scope.TRASH]: {
                id: 'trash',
                name: 'Move to trash',
                icon: 'fa-regular fa-trash',
                action: (scopes, item) => {
                    const list = item.map(({ id }) => id);

                    trash({ variables: { list } });
                }
            },
        },
    };

    return (
        <ScopesContext.Provider value={{ scopes, files, folders, massive }}>
            {children}
        </ScopesContext.Provider>
    )
}
