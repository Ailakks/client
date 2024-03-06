import {useContext} from "react";
import {Category, Scope, ScopesContext} from "../context/Scopes";
import ItemTool from "../data/list/ItemTool";
import FilePreview from "./FilePreview";
import {PopupContext} from "../../wrapper/ui/PopupProvider";
import Popup from "../ui/Popup";

export default function FilePopup() {
    const { close } = useContext(PopupContext);
    const { files } = useContext(ScopesContext);

    const list = {
        [Category.VIEW]: {
            [Scope.DOWNLOAD]: { ...files[Category.VIEW][Scope.DOWNLOAD] },
            [Scope.LINK]: { ...files[Category.VIEW][Scope.LINK] }
        },
        [Category.MANAGE]: {
            [Scope.CLONE]: { ...files[Category.MANAGE][Scope.CLONE] },
            [Scope.RENAME]: { ...files[Category.MANAGE][Scope.RENAME] }
        },
        [Category.DELETE]: {
            [Scope.TRASH]: { ...files[Category.DELETE][Scope.TRASH] }
        },
    };

    return (
        <Popup>
            <div className="space-y-10">
                <div className="flex justify-center">
                    <ItemTool scopes={list} />
                    <button className="menu" onClick={close}>
                        <i className="fa-regular fa-xmark" />
                    </button>
                </div>
                <FilePreview />
            </div>
        </Popup>
    )
}
