import {createContext, useContext, useState} from "react";
import {Category, Scope, ScopesDataContext} from "../context/Scopes";
import ItemTool from "../data/list/ItemTool";
import {PopupContext} from "../../wrapper/ui/PopupProvider";
import Popup from "../ui/Popup";
import FilePreview from "../file/FilePreview";
import Tabs from "../native/Tabs";
import List, {ListContext} from "../list/List";
import Tab from "../native/Tab";
import TabContent from "../native/TabContent";
import Integration from "./Integration";
import FileSpreadsheet from "../file/FileSpreadsheet";

export default function FilePopup() {
    const { close } = useContext(PopupContext);
    const { scopes, item: { name } } = useContext(ScopesDataContext);

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

    const integrations = [<FilePreview />, <FileSpreadsheet />];

    return (
        <Popup>
            <div className="flex flex-col h-full space-y-6">
                <div className="relative flex justify-center">
                    <div className="absolute left-3 top-0 bottom-0 flex items-center">
                        <p>{name}</p>
                    </div>
                    <ItemTool scopes={list} />
                    <div className="absolute right-0 top-0 bottom-0 flex items-center">
                        <button className="menu" onClick={close}>
                            <i className="fa-regular fa-xmark" />
                        </button>
                    </div>
                </div>
                <div className="flex grow justify-center">
                    <Tabs def={<FilePreview />}>
                        <List list={integrations}><Integration /></List>
                    </Tabs>
                </div>
            </div>
        </Popup>
    )
}
