import {createContext, useContext} from "react";
import List, {ListContext} from "../../list/List";
import {ScopesContext} from "../../context/Scopes";

export const ItemToolContext = createContext();

export default function ItemTool({ scopes }) {
    const { item } = useContext(ListContext);

    return (
        <ItemToolContext.Provider value={{ item }}>
            <div className="flex space-x-1">
                <List list={Object.values(scopes)}><Category /></List>
            </div>
        </ItemToolContext.Provider>
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
    const { files } = useContext(ScopesContext);
    const { item } = useContext(ItemToolContext);

    const { item: { icon, action } } = useContext(ListContext);

    return (
        <button className="menu" onClick={action(files, item)}>
            <i className={icon} />
        </button>
    )
}
