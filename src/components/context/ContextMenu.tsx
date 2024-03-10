import List, {ListContext} from "../list/List";
import {createContext, useContext} from "react";
import {clsx} from "clsx";
import {ScopesContext} from "./Scopes";

export const ContextMenuContext = createContext();

export default function ContextMenu({ list }) {
    const { item } = useContext(ListContext);

    return (
        <ContextMenuContext.Provider value={{ item }}>
            <div className="bg-gray-500 rounded-xl min-w-52 divide-y-1 divide-gray-300 divide- overflow-hidden">
                <List list={Object.values(list)}><Category /></List>
            </div>
        </ContextMenuContext.Provider>
    )
}

function Category() {
    const { item } = useContext(ListContext);

    return (
        <div>
            <List list={Object.values(item)}><Item /></List>
        </div>
    )
}

function Item() {
    const scopes = useContext(ScopesContext);

    const { item } = useContext(ContextMenuContext);
    const { item: { icon, name, action } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(scopes, item)}>
            <i className={clsx('w-6', icon)} />
            <p>{name}</p>
        </div>
    )
}
