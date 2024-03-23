import {useContext} from "react";
import List, {ListContext} from "../../list/List";
import {ScopesDataContext} from "../../context/Scopes";

export default function ItemTool({ scopes }) {
    return (
        <div className="flex space-x-1">
            <List list={Object.values(scopes)}><Category /></List>
        </div>
    )
}

function Category() {
    const { item } = useContext(ListContext);

    return (
        <div className="flex space-x-1">
            <List list={Object.values(item)}><Item /></List>
        </div>
    )
}

function Item() {
    const { item: { icon, action } } = useContext(ListContext);
    const { scopes, selected } = useContext(ScopesDataContext);

    const list = selected.length > 1 ? selected : selected[0];

    return (
        <button className="menu" onClick={() => action(scopes, list)}>
            <i className={icon} />
        </button>
    )
}
