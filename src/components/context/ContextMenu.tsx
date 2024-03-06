import List, {ListContext} from "../list/List";
import {useContext} from "react";
import {clsx} from "clsx";

export default function ContextMenu({ list }) {
    return (
        <div className="bg-gray-500 rounded-xl min-w-52 divide-y-2 divide-gray-300 divide- overflow-hidden">
            <List list={list}><Category /></List>
        </div>
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
    const { item: { icon, name } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2 cursor-pointer hover:bg-gray-300">
            <i className={clsx('w-6', icon)} />
            <p>{name}</p>
        </div>
    )
}
