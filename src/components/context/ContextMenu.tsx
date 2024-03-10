import List, {ListContext} from "../list/List";
import {createContext, useContext} from "react";

export const ContextMenuContext = createContext();

export default function ContextMenu({ list, children }) {
    return (
        <ContextMenuContext.Provider value={{ children }}>
            <div className="bg-gray-500 rounded-xl min-w-52 divide-y-1 divide-gray-300 divide- overflow-hidden">
                <List list={Object.values(list)}><Category /></List>
            </div>
        </ContextMenuContext.Provider>
    )
}

function Category() {
    const { children } = useContext(ContextMenuContext);
    const { item } = useContext(ListContext);

    return (
        <div>
            <List list={Object.values(item)}>{children}</List>
        </div>
    )
}
