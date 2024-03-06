import List, {ListContext} from "../list/List";
import {useContext} from "react";

export default function ContextMenu({ list }) {
    return (
        <div className="bg-gray-500 rounded-xl min-w-52 divide-y-2 divide-gray-700 overflow-hidden">
            <List list={list}><Category /></List>
        </div>
    )
}

function Category() {
    const { item } = useContext(ListContext);

    return (
        <div className="divide-y-[1px] divide-gray-300">
            <List list={Object.values(item)}><Item /></List>
        </div>
    )
}


function Item() {
    const { item: { icon, name } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2 cursor-pointer hover:bg-gray-300">
            <i className={icon} />
            <p>{name}</p>
        </div>
    )
}
