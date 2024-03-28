import List, {ListContext} from "../list/List";
import {createContext, useContext, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";

export const ContextMenuContext = createContext();

export default function ContextMenu({ list, content, children }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover isOpen={open} onOpenChange={status => setOpen(status)} onClick={() => setOpen(false)} placement="bottom">
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <ContextMenuContext.Provider value={{ content }}>
                    <div className="bg-gray-500 rounded-xl min-w-52 divide-y-1 divide-gray-300 divide- overflow-hidden">
                        <List list={Object.values(list)}><Category /></List>
                    </div>
                </ContextMenuContext.Provider>
            </PopoverContent>
        </Popover>
    )
}

function Category() {
    const { content } = useContext(ContextMenuContext);
    const { item } = useContext(ListContext);

    return (
        <div>
            <List list={Object.values(item)}>{content}</List>
        </div>
    )
}
