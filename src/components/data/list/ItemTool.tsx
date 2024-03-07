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
    const { scopes } = useContext(ScopesDataContext);
    const { data } = useContext(ScopesDataContext);

    const { item: { icon, action } } = useContext(ListContext);

    return (
        <button className="menu" onClick={() => action(scopes, data)}>
            <i className={icon} />
        </button>
    )
}
