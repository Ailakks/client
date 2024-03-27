import {useContext} from "react";
import List, {ListContext} from "../../list/List";
import {ScopesDataContext} from "../../context/Scopes";
import {SelectedContext} from "../ListView";

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
    const { scopes, item } = useContext(ScopesDataContext);

    const selection = useContext(SelectedContext);

    const handle = () => {
        if (selection) {
            const { setSelected } = selection;

            setSelected([]);
        }

        action(scopes, item);
    }

    return (
        <button className="menu" onClick={handle}>
            <i className={icon} />
        </button>
    )
}
