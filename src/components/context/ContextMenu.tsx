import List, {ListContext} from "../list/List";
import {useContext} from "react";

export default function ContextMenu({ list }) {
    return (
        <div className="bg-gray-500 rounded-xl min-w-52 divide-y-2 divide-gray-700">
            <List list={list}><Category /></List>
        </div>
    )
}

function Category() {
    const { item } = useContext(ListContext);

    return (
        <List list={Object.values(item)}><Item /></List>
    )
}


function Item() {
    const { item: { icon, name } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4 py-2">
            <i className={icon} />
            <p>{name}</p>
        </div>
    )
}
