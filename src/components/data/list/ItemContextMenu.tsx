import {createContext, useContext, useState} from "react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {ScopesContext} from "../../context/Scopes";
import ContextMenu from "../../context/ContextMenu";
import {ListContext} from "../../list/List";
import {clsx} from "clsx";
import {ItemMenuContext} from "../ListView";
import {QueryContext} from "../../query/Query";
import {FolderContext} from "./NewButton";
import {LanguageContext} from "../../../wrapper/lang/LanguageWrapper";

export const ItemContext = createContext();

export default function ItemContextMenu({ children }) {
    const [open, setOpen] = useState(false);

    const { item } = useContext(ListContext);

    const request = useContext(QueryContext);
    const scopes = useContext(ItemMenuContext);

    return (
        <Popover isOpen={open} onOpenChange={status => setOpen(status)} onClick={() => setOpen(false)} placement="bottom">
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <ScopesContext.Provider value={scopes}>
                    <ItemContext.Provider value={{ item }}>
                        <FolderContext.Provider value={request}>
                            <ContextMenu list={Object.values(scopes)}><Item /></ContextMenu>
                        </FolderContext.Provider>
                    </ItemContext.Provider>
                </ScopesContext.Provider>
            </PopoverContent>
        </Popover>
    )
}

function Item() {
    const { translate } = useContext(LanguageContext);

    const scopes = useContext(ScopesContext);

    const { item } = useContext(ItemContext);
    const { item: { id, icon, action } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(scopes, item)}>
            <i className={clsx('w-6', icon)} />
            <p>{translate(`file.context.${id}`)}</p>
        </div>
    )
}
