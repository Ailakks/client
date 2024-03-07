import {useContext} from "react";
import {Category, Scope, ScopesDataContext} from "../context/Scopes";
import ItemTool from "../data/list/ItemTool";
import FilePreview from "./FilePreview";
import {PopupContext} from "../../wrapper/ui/PopupProvider";
import Popup from "../ui/Popup";

export default function FilePopup() {
    const { close } = useContext(PopupContext);
    const { scopes } = useContext(ScopesDataContext);
    const { data: { name } } = useContext(ScopesDataContext);

    const list = {
        [Category.VIEW]: {
            [Scope.DOWNLOAD]: { ...scopes[Category.VIEW][Scope.DOWNLOAD] },
            [Scope.LINK]: { ...scopes[Category.VIEW][Scope.LINK] }
        },
        [Category.MANAGE]: {
            [Scope.CLONE]: { ...scopes[Category.MANAGE][Scope.CLONE] },
            [Scope.RENAME]: { ...scopes[Category.MANAGE][Scope.RENAME] }
        },
        [Category.DELETE]: {
            [Scope.TRASH]: { ...scopes[Category.DELETE][Scope.TRASH] }
        },
    };

    return (
        <Popup>
            <div className="flex flex-col h-full space-y-6">
                <div className="relative flex justify-center">
                    <div className="absolute left-3">
                        <p>{name}</p>
                    </div>
                    <ItemTool scopes={list} />
                    <div className="absolute right-0">
                        <button className="menu" onClick={close}>
                            <i className="fa-regular fa-xmark" />
                        </button>
                    </div>
                </div>
                <FilePreview />
            </div>
        </Popup>
    )
}
