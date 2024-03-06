import List, {ListContext} from "../list/List";
import {useContext} from "react";

export default function ContextMenu({ list }) {
    return (
        <div className="bg-gray-500 rounded-xl py-4 space-y-2 min-w-44">
            <List list={list} children={<Item />} />
        </div>
    )
}

function Item() {
    const { item: { icon, name } } = useContext(ListContext);

    return (
        <div className="flex items-center space-x-2 text-white px-4">
            <i className={icon} />
            <p>{name}</p>
        </div>
    )
}
