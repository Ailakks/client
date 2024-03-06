import {useContext} from "react";
import List, {ListContext} from "../list/List";

export default function ItemTool({ scopes }) {
    return (
        <div className="flex divide-x-2 divide-gray-300">
            <List list={Object.values(scopes)}><Category /></List>
        </div>
    )
}

function Category() {
    const { item } = useContext(ListContext);

    return (
        <div className="flex">
            <List list={Object.values(item)}><Item /></List>
        </div>
    )
}

function Item() {
    const { item: { icon } } = useContext(ListContext);

    return (
        <button className="menu">
            <i className={icon} />
        </button>
    )
}
