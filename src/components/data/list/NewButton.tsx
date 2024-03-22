import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import ContextMenu from "../../context/ContextMenu";
import {createContext, useContext} from "react";
import {QueryContext} from "../../query/Query";
import {ListContext} from "../../list/List";
import {clsx} from "clsx";
import CreateFolderPopup from "../../ui/popup/content/CreateFolderPopup";
import {PopupContext} from "../../../wrapper/ui/PopupProvider";

const Category = {
    UPLOAD: "upload",
    CREATE: "create",
}

const Scope = {
    FILE: "file",
    FOLDER: "folder"
}

export const FolderContext = createContext();

export default function NewButton() {
    const { setCurrent } = useContext(PopupContext);

    const request = useContext(QueryContext);

    const list = {
        [Category.CREATE]: {
            [Scope.FOLDER]: {
                icon: 'fa-regular fa-folder',
                name: 'Create folder',
                action: (data) => {
                    setCurrent(
                        <FolderContext.Provider value={request}>
                            <CreateFolderPopup />
                        </FolderContext.Provider>
                    )
                }
            }
        },
        [Category.UPLOAD]: {
            [Scope.FILE]: {
                icon: 'fa-regular fa-arrow-up-from-bracket',
                name: 'Upload file',
                action: (data) => {

                }
            }
        }
    };

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <button className="main icon">
                    <i className="fa-regular fa-plus" />
                    <p>New</p>
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <ContextMenu list={list}><Item /></ContextMenu>
            </PopoverContent>
        </Popover>
    )
}

function Item() {
    const { data } = useContext(QueryContext);
    const { item: { icon, name, action } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(data)}>
            <i className={clsx('w-6', icon)} />
            <p>{name}</p>
        </div>
    )
}
