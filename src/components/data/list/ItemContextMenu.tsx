import {createContext, useContext, useState} from "react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {ScopesContext, ScopesDataContext} from "../../context/Scopes";
import ContextMenu from "../../context/ContextMenu";
import {ListContext} from "../../list/List";
import {clsx} from "clsx";

export const ItemContext = createContext();

export default function ItemContextMenu({ children }) {
    const [open, setOpen] = useState(false);

    const { item } = useContext(ListContext);
    const { files } = useContext(ScopesContext);

    return (
        <Popover isOpen={open} onOpenChange={status => setOpen(status)} onClick={() => setOpen(false)} placement="bottom">
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <ScopesContext.Provider value={files}>
                    <ItemContext.Provider value={{ item }}>
                        <ContextMenu list={Object.values(files)}><Item /></ContextMenu>
                    </ItemContext.Provider>
                </ScopesContext.Provider>
            </PopoverContent>
        </Popover>
    )
}

function Item() {
    const scopes = useContext(ScopesContext);

    const { item } = useContext(ItemContext);
    const { item: { icon, name, action } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(scopes, item)}>
            <i className={clsx('w-6', icon)} />
            <p>{name}</p>
        </div>
    )
}
