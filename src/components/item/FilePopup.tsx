import {useContext} from "react";
import {Category, Scope, ScopesContext} from "../context/Scopes";
import ItemTool from "../data/list/ItemTool";

export default function FilePopup() {
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
        <div className="flex justify-center">
            <ItemTool scopes={list} />
        </div>
    )
}
