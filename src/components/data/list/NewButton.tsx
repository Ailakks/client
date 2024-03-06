import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import ContextMenu from "../../context/ContextMenu";

const Category = {
    UPLOAD: "upload",
    CREATE: "create",
}

const Scope = {
    FILE: "file",
    FOLDER: "folder"
}

export default function NewButton() {
    const list = {
        [Category.CREATE]: {
            [Scope.FOLDER]: {
                icon: 'fa-regular fa-folder',
                name: 'Create folder'
            }
        },
        [Category.UPLOAD]: {
            [Scope.FILE]: {
                icon: 'fa-regular fa-arrow-up-from-bracket',
                name: 'Upload file'
            }
        }
    };

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <button className="main flex items-center space-x-4">
                    <i className="fa-regular fa-plus" />
                    <p>New</p>
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <ContextMenu list={list} />
            </PopoverContent>
        </Popover>
    )
}
